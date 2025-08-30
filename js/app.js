var circlefigure = document.getElementById('circle')
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera ( 70, 1, 1, 1000 );
camera.position.set(0, 0, 10);
var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(250, 250);
circlefigure.appendChild(renderer.domElement);

var geom = new THREE.CircleGeometry( 7, 32 );

var material = new THREE.ShaderMaterial({
  uniforms: {
    texture: {
      value: new THREE.TextureLoader().load("../images/teture.jpg")
    },
    time: {
      value: 0
    }
  },
  vertexShader: `
  	varying vec2 vUv;
    
  	void main() {
			vUv = uv;        
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
  	#define PI 3.1415926
    
  	uniform sampler2D texture;
    uniform float time;
    
  	varying vec2 vUv;
    
    void main() {
    	vec2 uv = vUv;
      uv.y += sin(uv.x * PI * 04. + time) * .04;
    	gl_FragColor = texture2D( texture, uv );
    }
  `
});

var mesh = new THREE.Mesh(geom, material);
scene.add(mesh);

var clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  mesh.material.uniforms.time.value = clock.getElapsedTime();
  renderer.render(scene, camera)
});
