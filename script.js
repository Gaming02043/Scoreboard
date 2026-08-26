document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // ELEMENTOS
    // =========================================================

    const select1 = document.getElementById("team1");
    const select2 = document.getElementById("team2");

    const flag1 = document.getElementById("flag1");
    const flag2 = document.getElementById("flag2");

    const code1 = document.getElementById("code1");
    const code2 = document.getElementById("code2");

    const penCode1 = document.getElementById("penCode1");
    const penCode2 = document.getElementById("penCode2");

    const score1 = document.getElementById("score1");
    const score2 = document.getElementById("score2");

    const penalty1 = document.getElementById("penalty1");
    const penalty2 = document.getElementById("penalty2");

    const cards1 = document.getElementById("cards1");
    const cards2 = document.getElementById("cards2");

    const showPenalties =
        document.getElementById("showPenalties");

    const penalties =
        document.getElementById("penalties");


    // =========================================================
    // LOGO / BALON
    // =========================================================

    const editionBall =
        document.querySelector(".edition");

    if (editionBall) {

        editionBall.addEventListener("click", event => {
            event.preventDefault();
        });

    }


    // =========================================================
    // COMPROBACIONES
    // =========================================================

    if (
        !select1 ||
        !select2 ||
        !flag1 ||
        !flag2 ||
        !code1 ||
        !code2 ||
        !score1 ||
        !score2 ||
        !penalty1 ||
        !penalty2
    ) {

        console.error("Faltan elementos del marcador.");
        return;

    }


    if (typeof teams === "undefined") {

        console.error("No se encontro teams.js.");
        return;

    }


    // =========================================================
    // EQUIPOS PROHIBIDOS
    // =========================================================

    const prohibitedMatches = [

        ["KOS", "SRB"],
        ["KOS", "BIH"],
        ["KOS", "RUS"],

        ["UKR", "RUS"],
        ["UKR", "BLR"],

        ["ARM", "AZE"],

        ["ESP", "GIB"]

    ];


    function isProhibitedMatch(value1, value2) {

        if (
            value1 === "" ||
            value2 === ""
        ) {

            return false;

        }


        const team1 =
            teams[Number(value1)];

        const team2 =
            teams[Number(value2)];


        if (!team1 || !team2) {

            return false;

        }


        return prohibitedMatches.some(match => {

            return (

                (
                    team1.code === match[0] &&
                    team2.code === match[1]
                )

                ||

                (
                    team1.code === match[1] &&
                    team2.code === match[0]
                )

            );

        });

    }


    // =========================================================
    // CARGAR SELECTORES
    // =========================================================

    function populateSelect(select) {

        select.innerHTML = "";

        const option =
            document.createElement("option");

        option.value = "";
        option.textContent = "Select a Nation";

        select.appendChild(option);


        teams.forEach((team, index) => {

            const teamOption =
                document.createElement("option");

            teamOption.value = String(index);
            teamOption.textContent = team.name;

            select.appendChild(teamOption);

        });

    }


    populateSelect(select1);
    populateSelect(select2);


    // =========================================================
    // BANDERAS CUADRADAS
    // =========================================================

    const squareFlagCodes = [
        "SUI",
        "VAT",
        "AYM",
        "NWS",
        "APT"
    ];


    // =========================================================
    // ACTUALIZAR NACION
    // =========================================================

    function updateNation(
        select,
        flag,
        code,
        penCode
    ) {

        if (select.value === "") {

            flag.src =
                "DefaultNationsFlag.png";

            flag.alt =
                "Select a Nation";

            flag.style.display = "block";

            flag.classList.remove("square-flag");

            code.textContent = "NAT";

            penCode.textContent = "NAT";

            return;

        }


        const team =
            teams[Number(select.value)];


        if (!team) {

            return;

        }


        if (squareFlagCodes.includes(team.code)) {

            flag.classList.add("square-flag");

        } else {

            flag.classList.remove("square-flag");

        }


        flag.src = team.flag;

        flag.alt = team.name;

        flag.style.display = "block";

        code.textContent = team.code;

        penCode.textContent = team.code;

    }


    // =========================================================
    // BLOQUEAR EQUIPOS REPETIDOS Y PROHIBIDOS
    // =========================================================

    function preventSameTeam() {

        const value1 = select1.value;
        const value2 = select2.value;


        Array.from(select1.options).forEach(option => {

            option.disabled = false;


            if (
                option.value !== "" &&
                option.value === value2
            ) {

                option.disabled = true;

            }


            if (
                option.value !== "" &&
                isProhibitedMatch(
                    option.value,
                    value2
                )
            ) {

                option.disabled = true;

            }

        });


        Array.from(select2.options).forEach(option => {

            option.disabled = false;


            if (
                option.value !== "" &&
                option.value === value1
            ) {

                option.disabled = true;

            }


            if (
                option.value !== "" &&
                isProhibitedMatch(
                    value1,
                    option.value
                )
            ) {

                option.disabled = true;

            }

        });

    }


    // =========================================================
    // NUMEROS 0 - 999
    // =========================================================

    function normalizeNumber(
        input,
        storageName
    ) {

        let value =
            input.value.replace(
                /[^0-9]/g,
                ""
            );


        value =
            value.substring(0, 3);


        if (value === "") {

            localStorage.setItem(
                storageName,
                ""
            );

            return;

        }


        let number =
            parseInt(value, 10);


        if (isNaN(number)) {

            number = 0;

        }


        if (number > 999) {

            number = 999;

        }


        if (number < 0) {

            number = 0;

        }


        input.value =
            String(number);


        localStorage.setItem(
            storageName,
            String(number)
        );

    }


    // =========================================================
    // INPUTS NUMERICOS
    // SOLO PERMITE 0 - 9
    // MAXIMO 3 DIGITOS
    // =========================================================

    [
        score1,
        score2,
        penalty1,
        penalty2
    ].forEach(input => {

        input.type = "text";

        input.inputMode = "numeric";

        input.maxLength = 3;

        input.autocomplete = "off";


        input.addEventListener(
            "beforeinput",
            event => {

                if (
                    event.data !== null &&
                    !/^[0-9]+$/.test(event.data)
                ) {

                    event.preventDefault();

                }

            }
        );


        input.addEventListener(
            "paste",
            event => {

                const pastedText =
                    event.clipboardData.getData("text");


                if (
                    !/^[0-9]+$/.test(pastedText)
                ) {

                    event.preventDefault();

                }

            }
        );


        input.addEventListener(
            "input",
            () => {

                input.value =
                    input.value
                        .replace(/[^0-9]/g, "")
                        .substring(0, 3);

            }
        );

    });


    // =========================================================
    // GUARDAR MARCADOR
    // =========================================================

    score1.addEventListener(
        "input",
        () => {

            normalizeNumber(
                score1,
                "score1"
            );

        }
    );


    score2.addEventListener(
        "input",
        () => {

            normalizeNumber(
                score2,
                "score2"
            );

        }
    );


    penalty1.addEventListener(
        "input",
        () => {

            if (select1.value === "") {

                penalty1.value = "";

                return;

            }


            normalizeNumber(
                penalty1,
                "penalty1"
            );

        }
    );


    penalty2.addEventListener(
        "input",
        () => {

            if (select2.value === "") {

                penalty2.value = "";

                return;

            }


            normalizeNumber(
                penalty2,
                "penalty2"
            );

        }
    );


    // =========================================================
    // SI SE BORRA Y SE SALE -> 0
    // =========================================================

    function forceZeroOnBlur(
        input,
        select,
        storageName
    ) {

        if (
            select.value !== "" &&
            input.value === ""
        ) {

            input.value = "0";

            localStorage.setItem(
                storageName,
                "0"
            );

        }

    }


    score1.addEventListener(
        "blur",
        () => {

            forceZeroOnBlur(
                score1,
                select1,
                "score1"
            );

        }
    );


    score2.addEventListener(
        "blur",
        () => {

            forceZeroOnBlur(
                score2,
                select2,
                "score2"
            );

        }
    );


    penalty1.addEventListener(
        "blur",
        () => {

            forceZeroOnBlur(
                penalty1,
                select1,
                "penalty1"
            );

        }
    );


    penalty2.addEventListener(
        "blur",
        () => {

            forceZeroOnBlur(
                penalty2,
                select2,
                "penalty2"
            );

        }
    );


    // =========================================================
    // BLOQUEAR PENALES SIN NACION
    // =========================================================

    function updatePenaltyState(
        input,
        select
    ) {

        if (select.value === "") {

            input.value = "";

            input.disabled = true;


            const storageName =
                input.id === "penalty1"
                    ? "penalty1"
                    : "penalty2";


            localStorage.setItem(
                storageName,
                ""
            );

        } else {

            input.disabled = false;


            if (input.value === "") {

                input.value = "0";

            }

        }

    }


    // =========================================================
    // CAMBIO EQUIPO 1
    // =========================================================

    select1.addEventListener(
        "change",
        () => {

            if (
                isProhibitedMatch(
                    select1.value,
                    select2.value
                )
            ) {

                select1.value = "";

            }


            if (select1.value === "") {

                localStorage.removeItem(
                    "selectedTeam1"
                );


                score1.value = "";

                penalty1.value = "";


                score1.disabled = true;

                penalty1.disabled = true;


                localStorage.setItem(
                    "score1",
                    ""
                );


                localStorage.setItem(
                    "penalty1",
                    ""
                );


                updatePenaltyState(
                    penalty1,
                    select1
                );

            } else {

                localStorage.setItem(
                    "selectedTeam1",
                    select1.value
                );


                score1.disabled = false;

                penalty1.disabled = false;


                if (score1.value === "") {

                    score1.value = "0";

                }


                if (penalty1.value === "") {

                    penalty1.value = "0";

                }


                normalizeNumber(
                    score1,
                    "score1"
                );


                normalizeNumber(
                    penalty1,
                    "penalty1"
                );

            }


            updateNation(
                select1,
                flag1,
                code1,
                penCode1
            );


            preventSameTeam();

        }
    );


    // =========================================================
    // CAMBIO EQUIPO 2
    // =========================================================

    select2.addEventListener(
        "change",
        () => {

            if (
                isProhibitedMatch(
                    select1.value,
                    select2.value
                )
            ) {

                select2.value = "";

            }


            if (select2.value === "") {

                localStorage.removeItem(
                    "selectedTeam2"
                );


                score2.value = "";

                penalty2.value = "";


                score2.disabled = true;

                penalty2.disabled = true;


                localStorage.setItem(
                    "score2",
                    ""
                );


                localStorage.setItem(
                    "penalty2",
                    ""
                );


                updatePenaltyState(
                    penalty2,
                    select2
                );

            } else {

                localStorage.setItem(
                    "selectedTeam2",
                    select2.value
                );


                score2.disabled = false;

                penalty2.disabled = false;


                if (score2.value === "") {

                    score2.value = "0";

                }


                if (penalty2.value === "") {

                    penalty2.value = "0";

                }


                normalizeNumber(
                    score2,
                    "score2"
                );


                normalizeNumber(
                    penalty2,
                    "penalty2"
                );

            }


            updateNation(
                select2,
                flag2,
                code2,
                penCode2
            );


            preventSameTeam();

        }
    );


    // =========================================================
    // TARJETAS ROJAS
    // MAXIMO 5
    // =========================================================

    function getCardCount(
        storageName
    ) {

        let amount =
            parseInt(
                localStorage.getItem(
                    storageName
                ),
                10
            );


        if (isNaN(amount)) {

            amount = 0;

        }


        if (amount < 0) {

            amount = 0;

        }


        if (amount > 5) {

            amount = 5;

        }


        return amount;

    }


    function renderCards(
        container,
        storageName
    ) {

        container.innerHTML = "";


        const amount =
            getCardCount(storageName);


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const card =
                document.createElement("span");


            card.className =
                "red-card";


            container.appendChild(card);

        }

    }


    function addRedCard(
        container,
        storageName
    ) {

        let amount =
            getCardCount(storageName);


        if (amount >= 5) {

            return;

        }


        amount++;


        localStorage.setItem(
            storageName,
            String(amount)
        );


        renderCards(
            container,
            storageName
        );

    }


    function removeRedCard(
        container,
        storageName
    ) {

        let amount =
            getCardCount(storageName);


        if (amount <= 0) {

            return;

        }


        amount--;


        if (amount === 0) {

            localStorage.removeItem(
                storageName
            );

        } else {

            localStorage.setItem(
                storageName,
                String(amount)
            );

        }


        renderCards(
            container,
            storageName
        );

    }


    // =========================================================
    // CLIC EN LA BANDERA
    //
    // COMPUTADOR:
    // IZQUIERDO = AÑADIR
    // DERECHO = QUITAR
    //
    // TELEFONO:
    // TOQUE = AÑADIR
    // MANTENER PRESIONADO = QUITAR
    // =========================================================

    function setupFlagCards(
        flag,
        container,
        storageName
    ) {

        let pressTimer = null;

        let longPress = false;


        // =====================================================
        // TOQUE / CLIC NORMAL
        // =====================================================

        flag.addEventListener(
            "click",
            event => {

                if (longPress) {

                    longPress = false;

                    return;

                }


                event.preventDefault();


                addRedCard(
                    container,
                    storageName
                );

            }
        );


        // =====================================================
        // CLIC DERECHO EN COMPUTADOR
        // =====================================================

        flag.addEventListener(
            "contextmenu",
            event => {

                event.preventDefault();


                removeRedCard(
                    container,
                    storageName
                );

            }
        );


        // =====================================================
        // MANTENER PRESIONADA EN TELEFONO
        // =====================================================

        flag.addEventListener(
            "touchstart",
            () => {

                longPress = false;


                clearTimeout(
                    pressTimer
                );


                pressTimer =
                    setTimeout(
                        () => {

                            longPress = true;


                            removeRedCard(
                                container,
                                storageName
                            );

                        },
                        600
                    );

            },
            {
                passive: true
            }
        );


        // =====================================================
        // SOLTAR EL DEDO
        // =====================================================

        flag.addEventListener(
            "touchend",
            () => {

                clearTimeout(
                    pressTimer
                );

            }
        );


        // =====================================================
        // CANCELAR
        // =====================================================

        flag.addEventListener(
            "touchcancel",
            () => {

                clearTimeout(
                    pressTimer
                );

            }
        );


        // =====================================================
        // SI EL DEDO SE MUEVE
        // =====================================================

        flag.addEventListener(
            "touchmove",
            () => {

                clearTimeout(
                    pressTimer
                );

            }
        );

    }


    setupFlagCards(
        flag1,
        cards1,
        "redCards1"
    );


    setupFlagCards(
        flag2,
        cards2,
        "redCards2"
    );


    // =========================================================
    // PENALES
    // =========================================================

    function updatePenaltiesVisibility() {

        if (!penalties) {

            return;

        }


        if (
            showPenalties &&
            showPenalties.checked
        ) {

            penalties.style.display =
                "flex";

        } else {

            penalties.style.display =
                "none";

        }

    }


    // =========================================================
    // GUARDAR ESTADO DE PENALES
    // =========================================================

    if (showPenalties) {

        showPenalties.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "showPenalties",
                    showPenalties.checked
                        ? "true"
                        : "false"
                );


                updatePenaltiesVisibility();

            }
        );


        const savedPenalties =
            localStorage.getItem(
                "showPenalties"
            );


        if (savedPenalties === "true") {

            showPenalties.checked = true;

        } else {

            showPenalties.checked = false;

        }

    }


    // =========================================================
    // RECUPERAR EQUIPOS
    // =========================================================

    const savedTeam1 =
        localStorage.getItem(
            "selectedTeam1"
        );


    const savedTeam2 =
        localStorage.getItem(
            "selectedTeam2"
        );


    if (
        savedTeam1 !== null &&
        teams[Number(savedTeam1)]
    ) {

        select1.value = savedTeam1;

    } else {

        select1.value = "";

    }


    if (
        savedTeam2 !== null &&
        teams[Number(savedTeam2)]
    ) {

        select2.value = savedTeam2;

    } else {

        select2.value = "";

    }


    // =========================================================
    // PARTIDO PROHIBIDO GUARDADO
    // =========================================================

    if (
        isProhibitedMatch(
            select1.value,
            select2.value
        )
    ) {

        select2.value = "";

        localStorage.removeItem(
            "selectedTeam2"
        );

    }


    // =========================================================
    // ACTUALIZAR EQUIPOS
    // =========================================================

    updateNation(
        select1,
        flag1,
        code1,
        penCode1
    );


    updateNation(
        select2,
        flag2,
        code2,
        penCode2
    );


    // =========================================================
    // RECUPERAR MARCADORES
    // =========================================================

    const savedScore1 =
        localStorage.getItem("score1");


    const savedScore2 =
        localStorage.getItem("score2");


    const savedPenalty1 =
        localStorage.getItem("penalty1");


    const savedPenalty2 =
        localStorage.getItem("penalty2");


    if (select1.value === "") {

        score1.value = "";

        penalty1.value = "";

        score1.disabled = true;

        penalty1.disabled = true;

    } else {

        score1.value =
            savedScore1 !== null &&
            savedScore1 !== ""
                ? savedScore1
                : "0";


        penalty1.value =
            savedPenalty1 !== null &&
            savedPenalty1 !== ""
                ? savedPenalty1
                : "0";


        score1.disabled = false;

        penalty1.disabled = false;


        normalizeNumber(
            score1,
            "score1"
        );


        normalizeNumber(
            penalty1,
            "penalty1"
        );

    }


    if (select2.value === "") {

        score2.value = "";

        penalty2.value = "";

        score2.disabled = true;

        penalty2.disabled = true;

    } else {

        score2.value =
            savedScore2 !== null &&
            savedScore2 !== ""
                ? savedScore2
                : "0";


        penalty2.value =
            savedPenalty2 !== null &&
            savedPenalty2 !== ""
                ? savedPenalty2
                : "0";


        score2.disabled = false;

        penalty2.disabled = false;


        normalizeNumber(
            score2,
            "score2"
        );


        normalizeNumber(
            penalty2,
            "penalty2"
        );

    }


    // =========================================================
    // TARJETAS GUARDADAS
    // =========================================================

    renderCards(
        cards1,
        "redCards1"
    );


    renderCards(
        cards2,
        "redCards2"
    );


    // =========================================================
    // BLOQUEAR EQUIPOS
    // =========================================================

    preventSameTeam();


    // =========================================================
    // ACTUALIZAR VISIBILIDAD DE PENALES
    // =========================================================

    updatePenaltiesVisibility();

});
