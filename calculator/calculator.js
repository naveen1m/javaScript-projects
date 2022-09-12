const allBtn = document.querySelectorAll(".btn");
const input = document.querySelector("#text");
let string = "";
// console.log(btn)
for(let button of allBtn){
    button.addEventListener("click",function(){
        if(this.textContent == "="){

            string = eval(string.replace(/x/g,'*'));
            input.value = string
        }
        else{
            if(this.textContent === "X"){
                string = string + "";
                // console.log(string)
               string =  string.slice(0, string.length-1);
            //    console.log(string);
               input.value = string;
            }
            else if(this.textContent === "C"){
                string = "";
                input.value = string;
            }
            else{
        string = string + this.textContent;
        input.value = string;
    }
        }
    })
}
