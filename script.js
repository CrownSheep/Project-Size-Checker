const fileInput = document.getElementById("file-chooser");
const fileInfo = document.getElementById("file-info");
const tierInfo = document.getElementById("tier-info");

tierInfo.style.display = "none";

fileInput.onchange = async () => {
    tierInfo.style.display = "inline-block";

    let total = 0, list = "";
    for (const file of fileInput.files) {
        const text = await file.text();
        const lines = text.split("\n").length;
        list += `${file.name} | ${lines} lines | ${(file.size / 1024).toFixed(2)} KB<br>`;
        total += file.size;
    }

    const size = total / 1024;
    fileInfo.innerHTML = `${list}<br><b>Total: ${size.toFixed(2)} KB (${total} Bytes)<br></b>`;

    const tier = size <= 2 ? "Ultra Hard" : size <= 5 ? "Hard" : size <= 15 ? "Standard" : "";

    if (!tier) {
        tierInfo.innerHTML = `<span class="fail">This project is over 15KB ):</span>`;
    } else {
        const tierClass = tier.toLowerCase().replace(" ", "-");
        tierInfo.innerHTML = `This project is <span class="${tierClass}">${tier}</span> tier.`;
    }
};
