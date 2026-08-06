const fileInput = document.getElementById("file-chooser");
const fileInfo = document.getElementById("file-info");
const tierInfo = document.getElementById("tier-info");

tierInfo.style.display = "none";

fileInput.onchange = () => {
    tierInfo.style.display = "inline-block";

    let total = 0, list = "";
    for (const file of fileInput.files) {
        total += file.size;
        list += `${file.name} | ${(file.size / 1024).toFixed(2)} KB<br>`;
    }

    const size = total / 1024;
    fileInfo.innerHTML = `${list}<br><b>Total: ${size.toFixed(2)} KB (${total} Bytes)</b>`;

    const tier = size <= 2 ? "Ultra Hard" : size <= 5 ? "Hard" : size <= 15 ? "Standard" : "";

    if (!tier) {
        tierInfo.innerHTML = `<span class="fail">This project is over 15KB ):</span>`;
    } else {
        const cssClass = tier.toLowerCase().replace(" ", "-");
        tierInfo.innerHTML = `This project is <span class="${cssClass}">${tier}</span> tier.`;
    }
};
