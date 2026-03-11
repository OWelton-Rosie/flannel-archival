import fs from "fs";
import path from "path";

const pdfDir = path.resolve("static/assets/pdfs");
const output = path.join(pdfDir, "pdfs.json");

function formatTitle(filename) {
	return filename
		.replace(".pdf", "")
		.replace(/[_-]/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

if (!fs.existsSync(pdfDir)) {
	console.error("PDF directory not found:", pdfDir);
	process.exit(1);
}

const files = fs
	.readdirSync(pdfDir)
	.filter((f) => f.endsWith(".pdf"))
	.sort((a, b) => a.localeCompare(b))
	.map((file) => ({
		name: formatTitle(file),
		url: `/assets/pdfs/${file}`
	}));

fs.writeFileSync(output, JSON.stringify(files, null, 2));

console.log(`Generated pdf manifest with ${files.length} PDFs`);