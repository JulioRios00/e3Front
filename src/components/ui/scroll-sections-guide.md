/**
 * ScrollSections Component Usage Guide
 * 
 * A modern full-screen scrolling component that creates a smooth, snap-to-section
 * experience. Each section takes up 100vh (full viewport height) and users can
 * navigate between sections using:
 * 
 * - Mouse wheel (scroll up/down)
 * - Keyboard arrows (Up/Down, PageUp/PageDown)
 * - Touch gestures (swipe up/down on mobile)
 * - Navigation dots (click to jump to specific section)
 * - Home/End keys (jump to first/last section)
 * 
 * Features:
 * - Smooth CSS transitions with cubic-bezier easing
 * - Navigation dots with hover effects
 * - Progress bar at the top
 * - Section counter
 * - Scroll indicator for next section
 * - Mobile-friendly touch gestures
 * - Keyboard accessibility
 * - Prevents scroll during transitions
 * 
 * Example Usage:
 * 
 * ```tsx
 * import { ScrollSections } from "@/components/ui/scroll-sections";
 * 
 * export default function HomePage() {
 *   const section1 = <div className="min-h-screen">Content 1</div>;
 *   const section2 = <div className="min-h-screen">Content 2</div>;
 *   const section3 = <div className="min-h-screen">Content 3</div>;
 * 
 *   return (
 *     <ScrollSections>
 *       {[section1, section2, section3]}
 *     </ScrollSections>
 *   );
 * }
 * ```
 * 
 * Best Practices:
 * - Each section should be designed for full viewport height
 * - Use flexbox or grid for vertical centering within sections
 * - Keep content responsive for different screen sizes
 * - Test on mobile devices for touch gesture experience
 * - Consider loading states for heavy content in sections
 */
