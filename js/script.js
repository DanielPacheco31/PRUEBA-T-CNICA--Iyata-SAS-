
// ===== IMPLEMENTACIÓN DE LAS SOLUCIONES ===== //

// Problema 1: Las Casitas de los Gatos Numéricos
function construirCasitas(cadenaJuguetes) {
  const resultado = [];
  const n = cadenaJuguetes.length;

  function esSegmentoValido(segmento) {
    if (segmento.length === 0) return false;
    if (segmento.length > 1 && segmento[0] === "0") return false;
    const num = parseInt(segmento);
    return num >= 0 && num <= 255;
  }

  function backtrack(inicio, partes, ipActual) {
    if (partes === 4 && inicio === n) {
      resultado.push(ipActual.slice(0, -1));
      return;
    }

    if (partes === 4 || inicio >= n) return;

    for (let len = 1; len <= 3 && inicio + len <= n; len++) {
      const segmento = cadenaJuguetes.substring(inicio, inicio + len);

      if (esSegmentoValido(segmento)) {
        backtrack(inicio + len, partes + 1, ipActual + segmento + ".");
      }
    }
  }

  backtrack(0, 0, "");
  return resultado;
}

// Problema 2: Secuencia de Siesta Felina
function longitudSiesta(collares) {
  if (collares.length === 0) return 0;

  const conjuntoCollares = new Set(collares);
  let maxLongitud = 0;

  for (const collar of conjuntoCollares) {
    if (!conjuntoCollares.has(collar - 1)) {
      let numActual = collar;
      let longitudActual = 1;

      while (conjuntoCollares.has(numActual + 1)) {
        numActual++;
        longitudActual++;
      }

      maxLongitud = Math.max(maxLongitud, longitudActual);
    }
  }

  return maxLongitud;
}

// Problema 3: Descifrando el Maullido Secreto
function descifrarMaullido(maullido, diccionarioFelino) {
  const resultado = [];
  const conjuntoPalabras = new Set(diccionarioFelino);

  function backtrack(inicio, fraseActual) {
    if (inicio === maullido.length) {
      resultado.push(fraseActual.trim());
      return;
    }

    for (let fin = inicio + 1; fin <= maullido.length; fin++) {
      const palabra = maullido.substring(inicio, fin);

      if (conjuntoPalabras.has(palabra)) {
        const separador = fraseActual.length > 0 ? " " : "";
        backtrack(fin, fraseActual + separador + palabra);
      }
    }
  }

  backtrack(0, "");
  return resultado;
}


//===== FUNCIONES DE LA INTERFAZ =====//

function resolverProblema1() {
  const cadena = document.getElementById("cadenaJuguetes").value.trim();
  const resultadoDiv = document.getElementById("resultado1");

  if (!cadena) {
    resultadoDiv.innerHTML =
      "<h4>⚠️ Error:</h4><p>Por favor ingresa una cadena de números.</p>";
    return;
  }

  if (!/^\d+$/.test(cadena)) {
    resultadoDiv.innerHTML =
      "<h4>⚠️ Error:</h4><p>La cadena solo debe contener dígitos.</p>";
    return;
  }

  resultadoDiv.innerHTML = '<h4>🔄 Calculando...</h4><p class="loading">⏳</p>';

  setTimeout(() => {
    const resultado = construirCasitas(cadena);

    if (resultado.length === 0) {
      resultadoDiv.innerHTML =
        "<h4>🚫 Sin resultados:</h4><p>No se pueden formar direcciones IP válidas con esta cadena.</p>";
    } else {
      let html = `<h4>🏡 ${resultado.length} dirección(es) IP válida(s):</h4>`;
      resultado.forEach((ip, index) => {
        html += `<div class="result-item">${index + 1}. ${ip}</div>`;
      });
      resultadoDiv.innerHTML = html;
    }
  }, 300);
}

function resolverProblema2() {
  const collaresStr = document.getElementById("collares").value.trim();
  const resultadoDiv = document.getElementById("resultado2");

  if (!collaresStr) {
    resultadoDiv.innerHTML =
      "<h4>⚠️ Error:</h4><p>Por favor ingresa números de collares.</p>";
    return;
  }

  try {
    const collares = collaresStr
      .split(",")
      .map((x) => parseInt(x.trim()))
      .filter((x) => !isNaN(x));

    if (collares.length === 0) {
      resultadoDiv.innerHTML =
        "<h4>⚠️ Error:</h4><p>No se encontraron números válidos.</p>";
      return;
    }

    resultadoDiv.innerHTML =
      '<h4>🔄 Calculando...</h4><p class="loading">⏳</p>';

    setTimeout(() => {
      const resultado = longitudSiesta(collares);

      let html = `<h4>📏 Longitud de la siesta más larga:</h4>`;
      html += `<div class="result-item">🎯 <strong>${resultado}</strong> gatos consecutivos</div>`;
      html += `<div class="result-item">📊 Array analizado: [${collares.join(
        ", "
      )}]</div>`;

      resultadoDiv.innerHTML = html;
    }, 300);
  } catch (error) {
    resultadoDiv.innerHTML =
      "<h4>⚠️ Error:</h4><p>Formato inválido. Usa números separados por comas.</p>";
  }
}

function resolverProblema3() {
  const maullido = document.getElementById("maullido").value.trim();
  const diccionarioStr = document.getElementById("diccionario").value.trim();
  const resultadoDiv = document.getElementById("resultado3");

  if (!maullido || !diccionarioStr) {
    resultadoDiv.innerHTML =
      "<h4>⚠️ Error:</h4><p>Por favor completa tanto el maullido como el diccionario.</p>";
    return;
  }

  const diccionario = diccionarioStr
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);

  if (diccionario.length === 0) {
    resultadoDiv.innerHTML =
      "<h4>⚠️ Error:</h4><p>El diccionario debe contener al menos una palabra.</p>";
    return;
  }

  resultadoDiv.innerHTML =
    '<h4>🔄 Descifrando...</h4><p class="loading">⏳</p>';

  setTimeout(() => {
    const resultado = descifrarMaullido(maullido, diccionario);

    if (resultado.length === 0) {
      resultadoDiv.innerHTML =
        "<h4>🚫 Sin resultados:</h4><p>No se puede descifrar el maullido con el diccionario proporcionado.</p>";
    } else {
      let html = `<h4>💬 ${resultado.length} posible(s) frase(s) felina(s):</h4>`;
      resultado.forEach((frase, index) => {
        html += `<div class="result-item">${index + 1}. "${frase}"</div>`;
      });
      html += `<div class="result-item">📚 Diccionario usado: [${diccionario.join(
        ", "
      )}]</div>`;
      resultadoDiv.innerHTML = html;
    }
  }, 500);
}

// Funciones para establecer ejemplos
function setExample1(value) {
  document.getElementById("cadenaJuguetes").value = value;
}

function setExample2(value) {
  document.getElementById("collares").value = value;
}

function setExample3(maullido, diccionario) {
  document.getElementById("maullido").value = maullido;
  document.getElementById("diccionario").value = diccionario;
}

// Ejecutar ejemplo inicial
window.onload = function () {
  console.log("🐱 Demo de Prueba Técnica Felina cargada exitosamente!");
};
