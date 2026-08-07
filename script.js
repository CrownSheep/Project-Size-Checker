const $ = id => document.getElementById(id);
const fileInput = $("file-chooser"), fileInfo = $("file-info"), tierInfo = $("tier-info");

tierInfo.style.display = "none";

fileInput.onchange = async () => {
    tierInfo.style.display = "inline-block";

    let files = [...fileInput.files];
    let total = files.reduce((a, f) => a + f.size, 0);

    let list = (await Promise.all(files.map(async f =>
        `${f.name} | ${(await f.text()).split("\n").length} lines | ${(f.size / 1024).toFixed(2)} KB`
    ))).join("<br>");

    let size = total / 1024;
    fileInfo.innerHTML = `${list}<br><br><b>Total: ${size.toFixed(2)} KB (${total} Bytes)</b>`;

    let tier = size <= 2 ? "Ultra Hard" : size <= 5 ? "Hard" : size <= 15 ? "Standard" : null;

    tierInfo.innerHTML = tier ? `This project is <span class="${tier.toLowerCase().replace(" ", "-")}">${tier}</span> tier.`
        : `<span class="fail">This project is over 15KB ):</span>`;
};