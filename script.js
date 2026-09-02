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
    // COMPETICIONES
    // =========================================================

    const competitions = [
        {
            name: "INTERNATIONAL FRIENDLY",
            className: "competition-international-friendly",
            allowed: "ALL"
        },

        {
            name: "COPA AMERICA",
            className: "competition-copa",
            allowed: "COPA"
        },

        {
            name: "EUROCUP",
            className: "competition-euro",
            allowed: "UEFA"
        },

        {
            name: "WORLD CUP",
            className: "competition-world",
            allowed: "FIFA"
        },

        {
            name: "QUALIFIERS",
            className: "competition-qualifiers",
            allowed: "FIFA"
        },

        {
            name: "GOLD CUP",
            className: "competition-gold",
            allowed: "CONCACAF"
        },

        {
            name: "ASIAN CUP",
            className: "competition-asia",
            allowed: "AFC"
        },

        {
            name: "AFRICAN NATIONS CUP",
            className: "competition-africa",
            allowed: "CAF"
        },

        {
            name: "OCEANIA NATIONS CUP",
            className: "competition-oceania",
            allowed: "OFC"
        }
    ];


    // =========================================================
    // ICONOS
    // =========================================================

    const competitionIcons = [
        "🤝",
        "🏆",
        "🏆",
        "🏆",
        "⚽",
        "🏆",
        "🏆",
        "🏆",
        "🏆",
        "🏆"
    ];


    const competitionStorageKey =
        "currentCompetition";


    let currentCompetition = parseInt(
        localStorage.getItem(competitionStorageKey),
        10
    );


    if (
        Number.isNaN(currentCompetition) ||
        currentCompetition < 0 ||
        currentCompetition >= competitions.length
    ) {
        currentCompetition = 0;
    }


    const editionBall =
        document.querySelector(".edition");

    const competitionName =
        document.querySelector(".competition-name");


    // =========================================================
    // NORMALIZAR NOMBRES
    // =========================================================

    function normalizeTeamName(name) {

        return String(name || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/&/g, "and")
            .replace(/['’]/g, "")
            .replace(/[^a-z0-9]+/gi, " ")
            .trim()
            .toLowerCase();
    }


    function makeSet(text) {

        return new Set(
            text
                .split("|")
                .map(normalizeTeamName)
                .filter(Boolean)
        );
    }


    // =========================================================
    // CONMEBOL
    // =========================================================

    const CONMEBOL = makeSet(
        "Argentina|Bolivia|Brazil|Chile|Colombia|Ecuador|Paraguay|Peru|Uruguay|Venezuela"
    );


    // =========================================================
    // CONCACAF
    // =========================================================

    const CONCACAF = makeSet(
        "Anguilla|Antigua and Barbuda|Aruba|Bahamas|Barbados|Belize|Bermuda|Bonaire|British Virgin Islands|Canada|Cayman Islands|Costa Rica|Cuba|Curacao|Dominica|Dominican Republic|El Salvador|French Guyana|Grenada|Guadeloupe|Guatemala|Guyana|Haiti|Honduras|Jamaica|Martinique|Mexico|Montserrat|Nicaragua|Panama|Puerto Rico|Saint Martin|Sint Maarten|St Kitts and Nevis|St Lucia|St Vincent and the Grenadines|Suriname|Trinidad and Tobago|Turks and Caicos Islands|US Virgin Islands|United States"
    );


    // =========================================================
    // UEFA
    // =========================================================

    const UEFA = makeSet(
        "Albania|Andorra|Armenia|Austria|Azerbaijan|Belarus|Belgium|Bosnia and Herzegovina|Bulgaria|Croatia|Cyprus|Czech Republic|Czechia|Denmark|England|Estonia|Faroe Islands|Finland|France|Georgia|Germany|Gibraltar|Greece|Hungary|Iceland|Israel|Italy|Kazakhstan|Kosovo|Latvia|Liechtenstein|Lithuania|Luxembourg|Malta|Moldova|Montenegro|Netherlands|North Macedonia|Northern Ireland|Norway|Poland|Portugal|Republic of Ireland|Romania|Russia|San Marino|Scotland|Serbia|Slovakia|Slovenia|Spain|Sweden|Switzerland|Turkey|Türkiye|Ukraine|Wales"
    );


    // =========================================================
    // AFC
    // =========================================================

    const AFC = makeSet(
        "Afghanistan|Australia|Bahrain|Bangladesh|Bhutan|Brunei Darussalam|Cambodia|China|China PR|Chinese Taipei|DPR Korea|Guam|Hong Kong China|Hong Kong, China|India|Indonesia|IR Iran|Iran|Iraq|Japan|Jordan|Korea Republic|South Korea|Kuwait|Kyrgyz Republic|Kyrgyzstan|Laos|Lebanon|Macau|Macau China|Macau, China|Malaysia|Maldives|Mongolia|Myanmar|Nepal|Oman|Pakistan|Palestine|Philippines|Qatar|Saudi Arabia|Singapore|Sri Lanka|Syria|Tajikistan|Thailand|Timor Leste|Timor-Leste|Turkmenistan|United Arab Emirates|Uzbekistan|Vietnam|Yemen"
    );


    // =========================================================
    // CAF
    // =========================================================

    const CAF = makeSet(
        "Algeria|Angola|Benin|Botswana|Burkina Faso|Burundi|Cabo Verde|Cape Verde|Cameroon|Central African Republic|Chad|Comoros|Congo|Congo DR|Democratic Republic of the Congo|Cote d Ivoire|Côte d'Ivoire|Djibouti|Egypt|Equatorial Guinea|Eritrea|Eswatini|Ethiopia|Gabon|Gambia|Ghana|Guinea|Guinea Bissau|Guinea-Bissau|Kenya|Lesotho|Liberia|Libya|Madagascar|Malawi|Mali|Mauritania|Mauritius|Morocco|Mozambique|Namibia|Niger|Nigeria|Rwanda|Sao Tome and Principe|São Tomé and Príncipe|Senegal|Seychelles|Sierra Leone|Somalia|South Africa|South Sudan|Sudan|Tanzania|Togo|Tunisia|Uganda|Zambia|Zimbabwe"
    );


    // =========================================================
    // OFC
    // =========================================================

    const OFC = makeSet(
        "American Samoa|Cook Islands|Fiji|New Caledonia|New Zealand|Papua New Guinea|Samoa|Solomon Islands|Tahiti|Tonga|Vanuatu"
    );


    // =========================================================
    // FIFA
    // =========================================================

    const NON_FIFA_CONCACAF = makeSet(
        "Bonaire|French Guiana|Guadeloupe|Martinique|Saint Martin|Sint Maarten"
    );


    const FIFA = new Set([
        ...[...CONCACAF].filter(
            name => !NON_FIFA_CONCACAF.has(name)
        ),

        ...CONMEBOL,
        ...UEFA,
        ...AFC,
        ...CAF,
        ...OFC
    ]);


    const EXTRA_GLOBAL = makeSet(
        "Western Sahara|Reunion|Réunion"
    );


    // =========================================================
    // PERTENENCIA A CONFEDERACIÓN
    // =========================================================

    function teamBelongsTo(group, team) {

        if (!team) {
            return false;
        }


        if (team.confederation) {

            const c =
                String(team.confederation).toUpperCase();


            if (
                group === "CONCACAF" &&
                c === "CONCACAF"
            ) {
                return true;
            }


            if (
                group === "CONMEBOL" &&
                c === "CONMEBOL"
            ) {
                return true;
            }


            if (
                group === "UEFA" &&
                c === "UEFA"
            ) {
                return true;
            }


            if (
                group === "AFC" &&
                c === "AFC"
            ) {
                return true;
            }


            if (
                group === "CAF" &&
                c === "CAF"
            ) {
                return true;
            }


            if (
                group === "OFC" &&
                c === "OFC"
            ) {
                return true;
            }


            if (group === "FIFA") {
                return true;
            }
        }


        const name =
            normalizeTeamName(team.name);


        if (group === "ALL") {
            return true;
        }


        // SOLO RUSIA
        if (group === "RUSSIA_ONLY") {
            return name === "russia";
        }


        if (group === "CONCACAF") {
            return CONCACAF.has(name);
        }


        if (group === "CONMEBOL") {
            return CONMEBOL.has(name);
        }


        if (group === "UEFA") {
            return UEFA.has(name);
        }


        if (group === "AFC") {
            return AFC.has(name);
        }


        if (group === "CAF") {
            return CAF.has(name);
        }


        if (group === "OFC") {
            return OFC.has(name);
        }


        if (group === "COPA") {
            return (
                CONMEBOL.has(name) ||
                CONCACAF.has(name)
            );
        }


        if (group === "FIFA") {
            return (
                FIFA.has(name) ||
                EXTRA_GLOBAL.has(name)
            );
        }


        return false;
    }


    function teamAllowedInCompetition(team) {

        return teamBelongsTo(
            competitions[currentCompetition].allowed,
            team
        );
    }


    // =========================================================
    // ACTUALIZAR COMPETICIÓN
    // =========================================================

    function updateCompetition() {

        const competition =
            competitions[currentCompetition];


        if (competitionName) {

            competitionName.textContent =
                competition.name;
        }


        if (editionBall) {

            editionBall.textContent =
                competitionIcons[currentCompetition];


            editionBall.className =
                "edition " +
                competition.className;


            editionBall.setAttribute(
                "aria-label",
                competition.name
            );


            editionBall.setAttribute(
                "title",
                competition.name
            );
        }


        localStorage.setItem(
            competitionStorageKey,
            String(currentCompetition)
        );
    }


    // =========================================================
    // CAMBIAR COMPETICIÓN
    // =========================================================

    function cycleCompetition() {

        currentCompetition =
            (currentCompetition + 1) %
            competitions.length;


        refreshTeamsForCompetition();

        updateCompetition();
    }


    // =========================================================
    // ACTUALIZAR SELECTORES SEGÚN TORNEO
    // =========================================================

    function refreshTeamsForCompetition() {

        const oldValue1 =
            select1.value;

        const oldValue2 =
            select2.value;


        populateSelect(select1);
        populateSelect(select2);


        // -----------------------------------------------------
        // EQUIPO 1
        // -----------------------------------------------------

        if (
            oldValue1 !== "" &&
            (
                !teams[Number(oldValue1)] ||
                !teamAllowedInCompetition(
                    teams[Number(oldValue1)]
                )
            )
        ) {

            localStorage.removeItem(
                "selectedTeam1"
            );
        }


        // -----------------------------------------------------
        // EQUIPO 2
        // -----------------------------------------------------

        if (
            oldValue2 !== "" &&
            (
                !teams[Number(oldValue2)] ||
                !teamAllowedInCompetition(
                    teams[Number(oldValue2)]
                )
            )
        ) {

            localStorage.removeItem(
                "selectedTeam2"
            );
        }


        // -----------------------------------------------------
        // RESTAURAR EQUIPO 1 SI SIGUE DISPONIBLE
        // -----------------------------------------------------

        if (
            oldValue1 !== "" &&
            teams[Number(oldValue1)] &&
            teamAllowedInCompetition(
                teams[Number(oldValue1)]
            )
        ) {

            select1.value =
                oldValue1;

        } else {

            select1.value = "";
        }


        // -----------------------------------------------------
        // RESTAURAR EQUIPO 2 SI SIGUE DISPONIBLE
        // -----------------------------------------------------

        if (
            oldValue2 !== "" &&
            teams[Number(oldValue2)] &&
            teamAllowedInCompetition(
                teams[Number(oldValue2)]
            )
        ) {

            select2.value =
                oldValue2;

        } else {

            select2.value = "";
        }


        handleTeamSelectionAfterCompetitionChange();
    }


    // =========================================================
    // CAMBIO DE EQUIPOS DESPUÉS DE CAMBIAR TORNEO
    // =========================================================

    function handleTeamSelectionAfterCompetitionChange() {

        // -----------------------------------------------------
        // EQUIPO 1
        // -----------------------------------------------------

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


            updateNation(
                select1,
                flag1,
                code1,
                penCode1
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
        }


        // -----------------------------------------------------
        // EQUIPO 2
        // -----------------------------------------------------

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


            updateNation(
                select2,
                flag2,
                code2,
                penCode2
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
        }


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


        preventSameTeam();
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

        console.error(
            "Faltan elementos del marcador."
        );

        return;
    }


    if (typeof teams === "undefined") {

        console.error(
            "No se encontró teams.js."
        );

        return;
    }


    // =========================================================
    // PARTIDOS PROHIBIDOS
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


    function isProhibitedMatch(
        value1,
        value2
    ) {

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


        return prohibitedMatches.some(
            match => {

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
            }
        );
    }


    // =========================================================
    // CARGAR SELECTORES
    // =========================================================

    function populateSelect(select) {

        select.innerHTML = "";


        const option =
            document.createElement("option");


        option.value = "";

        option.textContent =
            "Select a Nation";


        select.appendChild(option);


        teams.forEach(
            (team, index) => {

                if (
                    !teamAllowedInCompetition(team)
                ) {
                    return;
                }


                const teamOption =
                    document.createElement("option");


                teamOption.value =
                    String(index);


                teamOption.textContent =
                    team.name;


                select.appendChild(
                    teamOption
                );
            }
        );
    }


    populateSelect(select1);
    populateSelect(select2);


    // =========================================================
    // BOTÓN DE COMPETICIÓN
    // =========================================================

    if (editionBall) {

        editionBall.addEventListener(
            "click",
            cycleCompetition
        );
    }


    // =========================================================
    // NACIÓN
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


            flag.style.display =
                "block";


            code.textContent =
                "NAT";


            penCode.textContent =
                "NAT";


            flag.classList.remove(
                "square-flag"
            );


            return;
        }


        const team =
            teams[Number(select.value)];


        if (!team) {
            return;
        }


        flag.src =
            team.flag;


        flag.alt =
            team.name;


        flag.style.display =
            "block";


        code.textContent =
            team.code;


        penCode.textContent =
            team.code;


        // =====================================================
        // BANDERAS CUADRADAS
        // =====================================================

        const squareFlagCodes = [
            "SUI",
            "VAT",
            "AYM",
            "NWS",
            "APT",
            "MON"
        ];


        if (
            team.square === true ||
            squareFlagCodes.includes(team.code)
        ) {

            flag.classList.add(
                "square-flag"
            );

        } else {

            flag.classList.remove(
                "square-flag"
            );
        }
    }


    // =========================================================
    // BLOQUEAR MISMO EQUIPO / PARTIDOS PROHIBIDOS
    // =========================================================

    function preventSameTeam() {

        const value1 =
            select1.value;

        const value2 =
            select2.value;


        // -----------------------------------------------------
        // SELECT 1
        // -----------------------------------------------------

        Array.from(
            select1.options
        ).forEach(option => {

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


        // -----------------------------------------------------
        // SELECT 2
        // -----------------------------------------------------

        Array.from(
            select2.options
        ).forEach(option => {

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
    // NÚMEROS 0 - 999
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
            value.substring(0, 2);


        if (value === "") {

            localStorage.setItem(
                storageName,
                ""
            );

            return;
        }


        let number =
            parseInt(
                value,
                10
            );


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
    // INPUTS NUMÉRICOS
    // =========================================================

    [
        score1,
        score2,
        penalty1,
        penalty2
    ].forEach(input => {

        input.type = "text";

        input.inputMode =
            "numeric";

        input.maxLength = 3;

        input.autocomplete =
            "off";


        // -----------------------------------------------------
        // BLOQUEAR CARACTERES NO NUMÉRICOS
        // -----------------------------------------------------

        input.addEventListener(
            "beforeinput",
            event => {

                if (
                    event.data !== null &&
                    !/^[0-9]+$/.test(
                        event.data
                    )
                ) {

                    event.preventDefault();
                }
            }
        );


        // -----------------------------------------------------
        // BLOQUEAR PEGAR TEXTO
        // -----------------------------------------------------

        input.addEventListener(
            "paste",
            event => {

                const pastedText =
                    event.clipboardData.getData(
                        "text"
                    );


                if (
                    !/^[0-9]+$/.test(
                        pastedText
                    )
                ) {

                    event.preventDefault();
                }
            }
        );


        // -----------------------------------------------------
        // SEGURIDAD
        // -----------------------------------------------------

        input.addEventListener(
            "input",
            () => {

                input.value =
                    input.value
                        .replace(
                            /[^0-9]/g,
                            ""
                        )
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
    // ESTADO DE PENALES
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
            getCardCount(
                storageName
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const card =
                document.createElement(
                    "span"
                );


            card.className =
                "red-card";


            container.appendChild(
                card
            );
        }
    }


    function addRedCard(
        container,
        storageName
    ) {

        let amount =
            getCardCount(
                storageName
            );


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
            getCardCount(
                storageName
            );


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
    // BANDERA
    //
    // CLICK IZQUIERDO = AÑADIR
    // CLICK DERECHO = QUITAR
    // =========================================================

    function setupFlagCards(
        flag,
        container,
        storageName
    ) {

        flag.addEventListener(
            "click",
            event => {

                event.preventDefault();


                addRedCard(
                    container,
                    storageName
                );
            }
        );


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
    // SHOW PENALTIES
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
    // GUARDAR ESTADO DE SHOW PENALTIES
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

            showPenalties.checked =
                true;

        } else {

            showPenalties.checked =
                false;
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
        teams[Number(savedTeam1)] &&
        teamAllowedInCompetition(
            teams[Number(savedTeam1)]
        )
    ) {

        select1.value =
            savedTeam1;

    } else {

        select1.value = "";

        localStorage.removeItem(
            "selectedTeam1"
        );
    }


    if (
        savedTeam2 !== null &&
        teams[Number(savedTeam2)] &&
        teamAllowedInCompetition(
            teams[Number(savedTeam2)]
        )
    ) {

        select2.value =
            savedTeam2;

    } else {

        select2.value = "";

        localStorage.removeItem(
            "selectedTeam2"
        );
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
    // ACTUALIZAR NACIONES
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
        localStorage.getItem(
            "score1"
        );


    const savedScore2 =
        localStorage.getItem(
            "score2"
        );


    const savedPenalty1 =
        localStorage.getItem(
            "penalty1"
        );


    const savedPenalty2 =
        localStorage.getItem(
            "penalty2"
        );


    // ---------------------------------------------------------
    // EQUIPO 1
    // ---------------------------------------------------------

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


    // ---------------------------------------------------------
    // EQUIPO 2
    // ---------------------------------------------------------

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
    // COMPETICIÓN
    // =========================================================

    updateCompetition();


    // =========================================================
    // PENALES
    // =========================================================

    updatePenaltiesVisibility();

});