import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

// ── Types ────────────────────────────────────────────────────────────────────
interface NodeLogoItem {
  node: React.ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
}

interface ImageLogoItem {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
}

export type LogoItem = NodeLogoItem | ImageLogoItem;

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ── Internal helpers ─────────────────────────────────────────────────────────
const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 4, COPY_HEADROOM: 2 } as const;

const toCssLength = (value: number | string | undefined): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const useResizeObserver = (
  callback: () => void,
  elements: React.RefObject<Element | null>[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[],
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener('resize', callback);
      callback();
      return () => window.removeEventListener('resize', callback);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...dependencies]);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[],
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) { onLoad(); return; }
    let remaining = images.length;
    const handleLoad = () => { remaining -= 1; if (remaining === 0) onLoad(); };
    images.forEach((img) => {
      if ((img as HTMLImageElement).complete) { handleLoad(); }
      else {
        img.addEventListener('load', handleLoad, { once: true });
        img.addEventListener('error', handleLoad, { once: true });
      }
    });
    return () => images.forEach((img) => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleLoad);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, seqRef, ...dependencies]);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
) => {
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;
    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const ease = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * ease;

      if (seqSize > 0) {
        let next = offsetRef.current + velocityRef.current * dt;
        next = ((next % seqSize) + seqSize) % seqSize;
        offsetRef.current = next;
        track.style.transform = isVertical
          ? `translate3d(0, ${-next}px, 0)`
          : `translate3d(${-next}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

// ── Component ────────────────────────────────────────────────────────────────
export const LogoLoop = memo<LogoLoopProps>(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dirMult = isVertical ? (direction === 'up' ? 1 : -1) : (direction === 'left' ? 1 : -1);
    const speedMult = speed < 0 ? -1 : 1;
    return mag * dirMult * speedMult;
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const rect = seqRef.current?.getBoundingClientRect?.();
    const sw = rect?.width ?? 0;
    const sh = rect?.height ?? 0;
    if (isVertical) {
      const parentH = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentH > 0) {
        const target = Math.ceil(parentH);
        if (containerRef.current.style.height !== `${target}px`)
          containerRef.current.style.height = `${target}px`;
      }
      if (sh > 0) {
        setSeqHeight(Math.ceil(sh));
        const viewport = containerRef.current?.clientHeight ?? parentH ?? sh;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(viewport / sh) + ANIMATION_CONFIG.COPY_HEADROOM));
      }
    } else if (sw > 0) {
      setSeqWidth(Math.ceil(sw));
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(containerWidth / sw) + ANIMATION_CONFIG.COPY_HEADROOM));
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

  const cssVars = useMemo(() => ({
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
  }), [gap, logoHeight, fadeOutColor]);

  const rootClass = useMemo(() =>
    ['logoloop', isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
      fadeOut && 'logoloop--fade', scaleOnHover && 'logoloop--scale-hover', className]
      .filter(Boolean).join(' '),
    [isVertical, fadeOut, scaleOnHover, className]);

  const onMouseEnter = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(true); }, [effectiveHoverSpeed]);
  const onMouseLeave = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(false); }, [effectiveHoverSpeed]);

  const renderLogoItem = useCallback((item: LogoItem, key: React.Key) => {
    if (renderItem) {
      return <li className="logoloop__item" key={key} role="listitem">{renderItem(item, key)}</li>;
    }
    const isNode = 'node' in item;
    const itemTitle = isNode ? (item as NodeLogoItem).title : (item as ImageLogoItem).title;
    const content = isNode ? (
      <span className="logoloop__node" aria-hidden={!!(item as NodeLogoItem).href && !(item as NodeLogoItem).ariaLabel}>
        {(item as NodeLogoItem).node}
      </span>
    ) : (
      <img
        src={(item as ImageLogoItem).src}
        srcSet={(item as ImageLogoItem).srcSet}
        sizes={(item as ImageLogoItem).sizes}
        width={(item as ImageLogoItem).width}
        height={(item as ImageLogoItem).height}
        alt={(item as ImageLogoItem).alt ?? ''}
        title={(item as ImageLogoItem).title}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
    const itemAriaLabel = isNode
      ? ((item as NodeLogoItem).ariaLabel ?? (item as NodeLogoItem).title)
      : ((item as ImageLogoItem).alt ?? (item as ImageLogoItem).title);
    const href = (item as NodeLogoItem | ImageLogoItem & { href?: string }).href;
    const wrapped = href ? (
      <a className="logoloop__link" href={href} aria-label={itemAriaLabel || 'logo link'} target="_blank" rel="noreferrer noopener">
        {content}
      </a>
    ) : content;
    return (
      <li
        className="logoloop__item"
        key={key}
        role="listitem"
        data-title={itemTitle}
        aria-label={itemAriaLabel}
      >
        {wrapped}
      </li>
    );
  }, [renderItem]);

  const lists = useMemo(() =>
    Array.from({ length: copyCount }, (_, ci) => (
      <ul className="logoloop__list" key={`copy-${ci}`} role="list" aria-hidden={ci > 0}
        ref={ci === 0 ? seqRef : undefined}>
        {logos.map((item, ii) => renderLogoItem(item, `${ci}-${ii}`))}
      </ul>
    )), [copyCount, logos, renderLogoItem]);

  const containerStyle = useMemo(() => ({
    width: isVertical
      ? (toCssLength(width) === '100%' ? undefined : toCssLength(width))
      : (toCssLength(width) ?? '100%'),
    ...(cssVars as React.CSSProperties),
    ...style,
  }), [width, cssVars, style, isVertical]);

  return (
    <div ref={containerRef} className={rootClass} style={containerStyle} role="region" aria-label={ariaLabel}>
      <div className="logoloop__track" ref={trackRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {lists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
