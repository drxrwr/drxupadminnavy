function generateVCF() {
  const contactInput = document.getElementById("contactName").value.trim();
  const fileInput = document.getElementById("fileName").value.trim();
  const numbersInput = document.getElementById("numbers").value;

  if (!fileInput) {
    alert("Nama file wajib diisi");
    return;
  }

  const baseName = contactInput || fileInput;
  const lines = numbersInput.split("\n");
  let vcfContent = "";
  let index = 1;

  lines.forEach(line => {
    // Ambil angka saja
    let num = line.replace(/\D/g, "");

    if (num.length < 10) return;

    // Normalisasi awalan
    if (num.startsWith("0")) {
      num = "62" + num.slice(1);
    }

    if (!num.startsWith("62")) return;

    const finalNumber = "+" + num;

    // Nomor urut 01, 02, dst
    const order = index < 10 ? "0" + index : index;
    const contactName = `${baseName} ${order}`;

    vcfContent +=
`BEGIN:VCARD
VERSION:3.0
FN:${contactName}
TEL:${finalNumber}
END:VCARD
`;

    index++;
  });

  if (!vcfContent) {
    alert("Tidak ada nomor valid");
    return;
  }

  // Download file
  const blob = new Blob([vcfContent], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileInput + ".vcf";
  a.click();

  URL.revokeObjectURL(url);
}
