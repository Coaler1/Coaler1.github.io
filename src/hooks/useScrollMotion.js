import { useEffect, useRef } from "react";

export function useScrollMotion({ progressRef, rootRef, reducedMotion }) {
  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  const frame = useRef(null);

  useEffect(() => {
    currentScrollY.current = window.scrollY;
    targetScrollY.current = window.scrollY;

    const root = rootRef.current;
    const stage = root?.querySelector(".roblox-stage");
    const cube = root?.querySelector(".cube");
    const ring = root?.querySelector(".orbit-ring");
    const orb = root?.querySelector(".depth-orb");
    const plate = root?.querySelector(".depth-plate");
    const shard = root?.querySelector(".depth-shard");

    const clearDecorativeMotion = () => {
      [stage, cube, ring, orb, plate, shard].forEach((element) => {
        if (element) {
          element.style.transform = "";
        }
      });
    };

    if (reducedMotion) {
      clearDecorativeMotion();
    }

    const update = (timestamp = 0) => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollRatio = currentScrollY.current / maxScroll;
      const seconds = timestamp / 1000;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${scrollRatio})`;
      }

      if (!reducedMotion && stage) {
        const heroOffset = Math.min(1, currentScrollY.current / Math.max(1, window.innerHeight));
        const float = Math.sin(seconds * ((Math.PI * 2) / 7));
        const floatY = float * 5 - 6;
        const floatRotate = float * 1.8;

        stage.style.transform = `translate3d(${heroOffset * -10}px, ${heroOffset * 24 + floatY}px, 0) rotateX(${heroOffset * 4}deg) rotateY(${heroOffset * -7}deg) rotateZ(${heroOffset - 2 + floatRotate}deg)`;

        if (cube) {
          cube.style.transform = `rotateX(-18deg) rotateY(${seconds * 28}deg)`;
        }

        if (ring) {
          ring.style.transform = `rotateX(68deg) rotateZ(${-18 + seconds * 30}deg)`;
        }

        if (orb) {
          const bob = Math.sin(seconds * ((Math.PI * 2) / 8));
          orb.style.transform = `translate3d(${bob * -10}px, ${bob * -18}px, ${44 + bob * 20}px) rotateX(${bob * 10}deg) rotateY(${bob * -14}deg)`;
        }

        if (plate) {
          const drift = Math.sin(seconds * ((Math.PI * 2) / 8));
          plate.style.transform = `rotateX(62deg) rotateZ(${-18 + drift * 8}deg) translate3d(${drift * 18}px, ${drift * -8}px, ${-34 + drift * 16}px)`;
        }

        if (shard) {
          shard.style.transform = `rotateX(58deg) rotateY(${-20 + seconds * 24}deg) rotateZ(${42 + seconds * 24}deg)`;
        }
      }
    };

    const animate = (timestamp) => {
      currentScrollY.current += (targetScrollY.current - currentScrollY.current) * 0.16;
      update(timestamp);

      if (!reducedMotion || Math.abs(targetScrollY.current - currentScrollY.current) > 0.35) {
        frame.current = window.requestAnimationFrame(animate);
        return;
      }

      currentScrollY.current = targetScrollY.current;
      update(timestamp);
      frame.current = null;
    };

    const request = () => {
      targetScrollY.current = window.scrollY;

      if (!frame.current) {
        frame.current = window.requestAnimationFrame(animate);
      }
    };

    update();
    frame.current = window.requestAnimationFrame(animate);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      clearDecorativeMotion();

      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, [progressRef, reducedMotion, rootRef]);
}
