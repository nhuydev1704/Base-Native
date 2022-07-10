const fs = require("fs")

function genImageResource() {
  fs.readdir("./app/theme/lotties/", function (err, fileName) {
    if (err) {
      console.log(err)
      return
    }
    fs.writeFileSync(
      "./app/theme/lotties.ts",
      `const lotties = {
      ${fileName.map((iconNane) => {
        // eslint-disable-next-line no-undef
        path = `
      ${iconNane.replace(".json", "")}: require("./lotties/${iconNane}")`
        // eslint-disable-next-line no-undef
        return path
      })}
      }
  export default lotties`,
      { encoding: "utf8", flag: "w" },
    )
    console.log(`============== Linked ${fileName.length} images ==============`)
  })
}

genImageResource()
