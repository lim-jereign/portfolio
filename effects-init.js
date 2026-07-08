
createBorderGlow('.contact-card', {
  edgeSensitivity: 35,
  glowColor: '340 55% 65%',          
  backgroundColor: 'var(--white)',
  borderRadius: 12,                 
  glowRadius: 30,
  glowIntensity: 0.9,
  coneSpread: 30,
  animated: false,
  colors: ['#e08aa6', '#7fa377', '#c85e80']
});

document.querySelectorAll('.project-card').forEach(card => {
  createBorderGlow(card, {
    edgeSensitivity: 40,
    glowColor: '150 30% 55%',
    backgroundColor: 'var(--white)',
    borderRadius: 12,
    glowRadius: 24,
    glowIntensity: 0.8,
    colors: ['#7fa377', '#e08aa6', '#4f7548']
  });
});