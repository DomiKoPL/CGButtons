const stdinPrefix = "?>"

// todo make buttons next to each other
// todo more versions?: ALL; STDIN; DEBUG; FULL JSON


const copyToClipboardAsync = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);

    return Promise.reject('The Clipboard API is not available.');
}

const copyNodeStyle = (sourceNode, targetNode) => {
    const computedStyle = window.getComputedStyle(sourceNode);
    for (const key of computedStyle) {
        targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key))
    }
}

loading = setInterval(function () {
    const header = document.getElementsByClassName('ide-header');

    if (!header || header.length == 0) {
        console.log('Header not loaded!');
        return;
    }

    const title = document.getElementsByClassName("league-value"); // league-value // cg-ide-title

    if (!title || title.length == 0) {
        console.log('Game title not loaded!');
        return;
    }


    let buttonStderr = document.createElement("Button");
    let textStderr = document.createTextNode("[copy stderr]");
    copyNodeStyle(title[0], buttonStderr);

    let buttonStdin = document.createElement("Button");
    let textStdin = document.createTextNode("[copy stdin]");
    copyNodeStyle(title[0], buttonStdin);

    const rank = document.getElementsByClassName("rank-wrapper");

    if (rank && rank.length > 0) {
        // console.log("Rank not loaded!");
        // Copy color from current League

        // TODO: Sometimes rank could not be loaded

        const rankStyle = window.getComputedStyle(rank[0]);
        buttonStderr.style.webkitTextFillColor = "rgb(146, 150, 155)"  //rankStyle.webkitTextFillColor;
        buttonStdin.style.webkitTextFillColor = "rgb(255, 255, 255)"  //rankStyle.webkitTextFillColor;
    }

    buttonStderr.onclick = function (event) {
        console.log("Button stderr clicked!");

        let elements = document.getElementsByClassName('stderr');

        if (elements.length == 0) {
            return;
        }

        let contentStderr = "";
        let linesStderr = 0;

        for (let turn = 0; turn < elements.length; turn++) {
            let element = elements[turn];
            /*
                element.innerText sometimes have new lines symbols
                and sometimes doesn't :/
            */

            // content += elements[turn].innerText + "\n";

            for (let line of element.getElementsByClassName("outputLine")) {
                contentStderr += line.innerText + "\n";
                linesStderr += 1;
            }
        }

        if (contentStderr.length > 0) {
            copyToClipboardAsync(contentStderr);
            alert(`Copied stderr ${linesStderr} lines.`);
        }
    }

    buttonStdin.onclick = function (event) {
        console.log("Button stdin clicked!");

        let elements = document.getElementsByClassName('stderr');

        if (elements.length == 0) {
            return;
        }

        let contentStdin = "";
        let linesStdin = 0;

        for (let turn = 0; turn < elements.length; turn++) {
            let element = elements[turn];
            /*
                element.innerText sometimes have new lines symbols
                and sometimes doesn't :/
            */

            // content += elements[turn].innerText + "\n";

            for (let line of element.getElementsByClassName("outputLine")) {
                if (line.innerText.startsWith(stdinPrefix)) {
                    contentStdin += line.innerText.substring(2) + "\n";
                    linesStdin += 1;
                }
            }
        }

        if (contentStdin.length > 0) {
            copyToClipboardAsync(contentStdin);
            alert(`Copied stdin ${linesStdin} lines.`);
        }
    }

    buttonStderr.appendChild(textStderr);
    header[0].appendChild(buttonStderr);

    buttonStdin.appendChild(textStdin);
    header[0].appendChild(buttonStdin); // header[0]

    console.log('Button is added!');

    clearInterval(loading);
}, 100); // Checks every 100ms(0.1s)