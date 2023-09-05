import * as THREE from 'three';

// Configuração da cena
const cena = new THREE.Scene();

// Configuração da câmera ortogonal
const larguraTela = window.innerWidth;
const alturaTela = window.innerHeight;
const aspectRatio = larguraTela / alturaTela;
const camera = new THREE.OrthographicCamera(
    larguraTela / -20, larguraTela / 20,
    alturaTela / 20 / aspectRatio, alturaTela / -20 / aspectRatio,
    1, 1000
);
camera.position.set(0, 0, 10);

// Configuração do renderizador
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(larguraTela, alturaTela);
document.body.appendChild(renderizador.domElement);

// Configuração da luz ambiente
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
cena.add(luzAmbiente);

// Configuração da bola
const bolaGeometria = new THREE.SphereGeometry(0.5, 32, 32);
const bolaMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const bola = new THREE.Mesh(bolaGeometria, bolaMaterial);
cena.add(bola);

// Configuração da plataforma
const plataformaGeometria = new THREE.BoxGeometry(5, 0.5, 1);
const plataformaMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const plataforma = new THREE.Mesh(plataformaGeometria, plataformaMaterial);
plataforma.position.y = -4; // Ajuste a posição conforme necessário
cena.add(plataforma);

// Configuração do plano (parede)
const paredeGeometria = new THREE.PlaneGeometry(40, 20);
const paredeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const parede = new THREE.Mesh(paredeGeometria, paredeMaterial);
parede.position.z = -1;
cena.add(parede);

// Variáveis de controle do jogo
const velocidadeBola = 0.1;
let direcaoBola = new THREE.Vector2(1, 1);

// Função para atualizar a posição da bola
function atualizarBola() {
    bola.position.x += direcaoBola.x * velocidadeBola;
    bola.position.y += direcaoBola.y * velocidadeBola;
}

// Renderização do jogo
function animar() {
    requestAnimationFrame(animar);

    // Lógica do jogo
    atualizarBola();

    // Verifique colisões da bola com as paredes, plataforma, etc.

    renderizador.render(cena, camera);
}

animar();