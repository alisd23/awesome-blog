
import mojs from 'mo-js';

export default (el, elIcon, elCount) => {
  const scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
  const tweens = [
    // burst animation
    new mojs.Burst({
      parent: el,
      duration: 1500,
      shape : 'circle',
      fill : 'white',
      x: '50%',
      y: '50%',
      childOptions: {
        radius: {12:0},
        type: 'line',
        stroke: '#3CB5B5',
        strokeWidth: 2
      },
      opacity: 0.75,
      radius: {40:80},
      count: 20,
      isRunLess: true,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
    }),
    // ring animation
    new mojs.Transit({
      parent: el,
      duration: 800,
      type: 'circle',
      opacity: 0.75,
      radius: {10: 50},
      fill: 'transparent',
      stroke: '#988ADE',
      strokeWidth: {25:0},
      x: '50%',
      y: '50%',
      isRunLess: true,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
    }),
    // icon scale animation
    new mojs.Tween({
      duration : 800,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      onUpdate: function(progress) {
        var scaleProgress = scaleCurve(progress);
        elCount.style.WebkitTransform = elCount.style.transform
        = elIcon.style.WebkitTransform = elIcon.style.transform
          = `scale3d(${progress}, ${progress}, 1)`;
      }
    })
  ];

  const timeline = new mojs.Timeline();

  tweens.forEach((tween) => timeline.add(tween));

  return () => timeline.start();
}
