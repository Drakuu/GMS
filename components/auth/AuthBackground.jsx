// components/auth/AuthBackground.jsx
export default function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div className="absolute inset-0 bg-grid-small-muted/10 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      </div>
      
      {/* Animated blob */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
    </div>
  );
}