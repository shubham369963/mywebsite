function run(){
    let html = document.querySelector(".editor #htmlcode").value;
    let css = "<style>"+document.querySelector(".editor #csscode").value+"</style>";
    let js = document.querySelector(".editor #jscode").value;
    let output = document.querySelector("#output");
    output.contentDocument.body.innerHTML = html+css;
    output.contentWindow.eval(js);
    document.getElementById("output").contentWindow.document.body.style.color = "white";
}
document.querySelector(".editor #htmlcode").addEventListener("keyup" , run);
document.querySelector(".editor #csscode").addEventListener("keyup" , run);
document.querySelector(".editor #jscode").addEventListener("keyup" , run);