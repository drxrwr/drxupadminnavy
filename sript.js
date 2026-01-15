function generateVCF() {
  const contactInput = document.getElementById("contactName").value.trim();
  const fileInput = document.getElementById("fileName").value.trim();
  const numbersInput = document.getElementById("numbers").value;

  if (!fileInput) {
    alert("Nama file wajib diisi");
    return;
  }

  const baseName = contactInput || fileInput;
  const lines = numbersInput.split(/\r?\n/);
  let vcf = "";
  let count = 1;

  lines.forEach(line => {
    let num = line.replace(/\D/g, "");

    if (num.length < 10) return;

    if (num.startsWith("0")) {
      num = "62" + num.slice(1);
    }

    if (!num.startsWith("62")) return;

    const finalNumber = "+" + num;
    const order = count < 10 ? "0" + count : count;
    const contactName = `${baseName} ${order}`;

    vcf +=
`BEGIN:VCARD
VERSION:3.0
FN:${contactName}
TEL:${finalNumber}
END:VCARD
`;

    count++;
  });

  if (!vcf) {
    alert("Tidak ada nomor valid");
    return;
  }

  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // HP: buka file (import kontak)
    window.open(url, "_blank");
  } else {
    // PC: download otomatis
    const a = document.createElement("a");
    a.href = url;
    a.download = fileInput + ".vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
