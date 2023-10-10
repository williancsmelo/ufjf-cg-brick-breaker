import * as T from 'three'

export const createRenderer = () => {
    const renderer = new T.WebGLRenderer({
        antialias: true
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
  
    renderer.setClearColor(new T.Color("rgb(0, 0, 0)"));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-output").appendChild(renderer.domElement);
  
    return renderer;
}