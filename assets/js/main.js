const wFormulario = document.querySelector('#cc-formulario');

wFormulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const wPeso = parseFloat(e.target.querySelector("#cc-nr-peso").value);
    const wAltura = parseFloat(e.target.querySelector("#cc-nr-altura").value);

    if (wPeso && wAltura) {
        const wIMC = await fCalculaIMC(wAltura, wPeso);
        /* DETESTO ESSE MONTE DE IF, MAS OK */
        if (wIMC < 18.5) {
            const wNovoPeso = await fCalculaPesoIdeal(wAltura, 18.5);
            await fSetaResultado(`Abaixo do peso! <br> Você precisa pesar pelo menos ${wNovoPeso} kg para atingir o peso ideal.`, await fCriaElemento("p"), "cc-resultado-warning");
        } else if (wIMC >= 18.5 && wIMC < 25) {
            await fSetaResultado(`Peso ideal! <br> Parabéns!`, await fCriaElemento("p"), "cc-resultado-success");
        } else if (wIMC >= 25 && wIMC < 30) {
            const wNovoPeso = await fCalculaPesoIdeal(wAltura);
            await fSetaResultado(`Sobrepeso. <br> Você precisa pesar pelo menos ${wNovoPeso} kg para atingir o peso ideal.`, await fCriaElemento("p"), "cc-resultado-warning");
        } else if (wIMC >= 30 && wIMC < 35) {
            const wNovoPeso = await fCalculaPesoIdeal(wAltura);
            await fSetaResultado(`Obesidade grau I. <br> Você precisa pesar pelo menos ${wNovoPeso} kg para atingir o peso ideal.`, await fCriaElemento("p"), "cc-resultado-danger");
        } else if (wIMC >= 35 && wIMC < 40) {
            const wNovoPeso = await fCalculaPesoIdeal(wAltura);
            await fSetaResultado(`Obesidade grau II. <br> Você precisa pesar pelo menos ${wNovoPeso} kg para atingir o peso ideal.`, await fCriaElemento("p"), "cc-resultado-danger");
        } else if (wIMC >= 40) {
            const wNovoPeso = await fCalculaPesoIdeal(wAltura);
            await fSetaResultado(`Obesidade grau III. <br> Você precisa pesar pelo menos ${wNovoPeso} kg para atingir o peso ideal.`, await fCriaElemento("p"), "cc-resultado-danger");
        } else {
            await fSetaResultado("Valor inválido!", await fCriaElemento("p"), "cc-resultado-danger");
        }
    } else {
        await fSetaResultado("Valor inválido!", await fCriaElemento("p"), "cc-resultado-danger");
        return false;
    }
});

async function fCriaElemento(pElemento) {
    return document.createElement(pElemento);
}

async function fSetaResultado(pResult, pElemento, pDangerClass) {
    const wResult = document.querySelector("#cc-resultado");
    wResult.innerHTML = '';
    pElemento.classList.add(pDangerClass || "cc-resultado-success");
    pElemento.innerHTML = pResult;
    wResult.appendChild(pElemento);
}

async function fCalculaIMC(pAltura, pPeso) {
    return pPeso / (pAltura * pAltura);
}

async function fCalculaPesoIdeal(pAltura, pIMC) {
    const wIMC = pIMC || 24.9;
    return (wIMC * (pAltura * pAltura)).toFixed(2);
}