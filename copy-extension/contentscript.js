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

    const title = document.getElementsByClassName("cg-ide-title");

    if (!title || title.length == 0) {
        console.log('Game title not loaded!');
        return;
    }


    let button = document.createElement("Button");
    let text = document.createTextNode("Copy stderr");

    copyNodeStyle(title[0], button);

    const rank = document.getElementsByClassName("rank-wrapper");

    if (rank && rank.length > 0) {
        // console.log("Rank not loaded!");
        // Copy color from current League

        // TODO: Sometimes rank could not be loaded

        const rankStyle = window.getComputedStyle(rank[0]);
        button.style.webkitTextFillColor = rankStyle.webkitTextFillColor;
    }

    button.onclick = function (event) {
        console.log("Button clicked!");

        let elements = document.getElementsByClassName('stderr');

        if (elements.length == 0) {
            return;
        }

        let content = "";
        let lines = 0;

        for (let turn = 0; turn < elements.length; turn++) {
            let element = elements[turn];
            /*
                element.innerText sometimes have new lines symbols
                and sometimes doesn't :/
            */

            // content += elements[turn].innerText + "\n";

            for (let line of element.getElementsByClassName("outputLine")) {
                content += line.innerText + "\n";
                lines += 1;
            }
        }

        if (content.length > 0) {
            copyToClipboardAsync(content);
            alert(`Copied ${lines} lines.`);
        }
    }

    button.appendChild(text);

    header[0].appendChild(button);

    console.log('Button is added!');

    clearInterval(loading);
}, 100); // Checks every 100ms(0.1s)