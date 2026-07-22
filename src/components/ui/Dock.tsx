import { useRef, useState, useEffect, Children, isValidElement, cloneElement, createContext, useContext, type ReactNode, type ReactElement } from 'react';
import { motion, useSpring } from 'framer-motion';
import './Dock.css';

interface DockContextType {
  magnification: number;
  distance: number;
  baseItemSize: number;
  mouseX: number | null;
  itemPositions: { center: number }[];
}

const DockContext = createContext<DockContextType | null>(null);

interface DockProps {
  children: ReactNode;
  magnification?: number;
  distance?: number;
  baseItemSize?: number;
  panelHeight?: number;
}

interface DockItemProps {
  children: ReactNode;
  onClick?: () => void;
  label?: string;
  index?: number;
}

function Dock({
  children,
  magnification = 60,
  distance = 120,
  baseItemSize = 44,
  panelHeight = 64,
}: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [itemPositions, setItemPositions] = useState<{ center: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        setMouseX(e.clientX - rect.left);
      }
    };

    const handleMouseLeave = () => {
      setMouseX(null);
    };

    const el = dockRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove, { passive: true });
      el.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (dockRef.current) {
      const items = dockRef.current.querySelectorAll('.dock-item');
      const positions = Array.from(items).map((item) => {
        const rect = item.getBoundingClientRect();
        const parentRect = dockRef.current!.getBoundingClientRect();
        return { center: rect.left - parentRect.left + rect.width / 2 };
      });
      setItemPositions(positions);
    }
  }, [children]);

  const contextValue: DockContextType = { magnification, distance, baseItemSize, mouseX, itemPositions };

  return (
    <DockContext.Provider value={contextValue}>
      <div ref={dockRef} className="dock-container" style={{ height: panelHeight }}>
        <div className="dock-inner">
          {Children.map(children, (child, index) => {
            if (!isValidElement(child)) return child;
            return cloneElement(child as ReactElement<DockItemProps>, { index });
          })}
        </div>
      </div>
    </DockContext.Provider>
  );
}

function DockItem({ children, onClick, label, index = 0 }: DockItemProps) {
  const ctx = useContext(DockContext);

  const maxScale = ctx ? ctx.magnification / ctx.baseItemSize : 1;

  let targetScale = 1;
  let targetY = 0;

  if (ctx && ctx.mouseX !== null && ctx.itemPositions[index]) {
    const pos = ctx.itemPositions[index];
    const dist = Math.abs(ctx.mouseX - pos.center);
    if (dist < ctx.distance) {
      const t = 1 - dist / ctx.distance;
      const eased = 1 - Math.pow(1 - t, 2);
      targetScale = 1 + (maxScale - 1) * eased;
      targetY = -(targetScale - 1) * ctx.baseItemSize * 0.5;
    }
  }

  const scaleSpring = useSpring(1, { stiffness: 350, damping: 25 });
  const ySpring = useSpring(0, { stiffness: 350, damping: 25 });

  useEffect(() => {
    scaleSpring.set(targetScale);
    ySpring.set(targetY);
  }, [targetScale, targetY]);

  return (
    <motion.button
      className="dock-item"
      onClick={onClick}
      aria-label={label}
      title={label}
      style={{ scale: scaleSpring, y: ySpring }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      <div className="dock-item-icon">{children}</div>
      <span className="dock-tooltip">{label}</span>
    </motion.button>
  );
}

export { Dock, DockItem };
export default Dock;
