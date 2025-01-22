
// Crud Crud Url
const url = "https://crudcrud.com/api/466a922180904ed4b31faf0b92d0aa94" + "/candy"

document.addEventListener('DOMContentLoaded', async () => {
    try {
        let response = await axios.get(url)
        let candies = response.data
        console.log(candies)
        for (let candy of candies) {
            DisplayCandy(candy.candyname, candy.description, candy.price, candy.quantity, candy._id)
        }



        let form = document.getElementById("Form");
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent form submission and reload
            let candyname = event.target.candyname.value
            let description = event.target.description.value
            let price = event.target.price.value
            let quantity = event.target.quantity.value
            let candy = {
                candyname, description, price, quantity
            }

            let response = await axios.post(url, candy)
            let candyid = response.data._id
            DisplayCandy(candyname, description, price, quantity, candyid)
            event.target.reset()


        })
    }
    catch (error) {
        console.log(error.message)
    }
})


function DisplayCandy(candyname, description, price, quantity, id) {
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    let text = document.createTextNode(`${candyname}  ${description}  ${price} `);

    let quantitySpan = document.createElement("span");
    quantitySpan.textContent = quantity;

    let buy1_btn = document.createElement("button");
    buy1_btn.textContent = "Buy One";
    let buy2_btn = document.createElement("button");
    buy2_btn.textContent = "Buy Two";
    let buy3_btn = document.createElement("button");
    buy3_btn.textContent = "Buy Three";
    let delete_btn=document.createElement("button")
    delete_btn.textContent="Delete"

    li.appendChild(text);
    li.appendChild(quantitySpan);
    li.appendChild(buy1_btn);
    li.appendChild(buy2_btn);
    li.appendChild(buy3_btn);
    li.appendChild(delete_btn)
    ul.appendChild(li);
    document.body.appendChild(ul);
    li.style.paddingTop = "5px"
    buy1_btn.style.backgroundColor = "gray";
// currying in js...
    buy1_btn.addEventListener('click', async () => {
        if (quantity >= 1) {
            quantity = quantity - 1;
            quantitySpan.textContent = quantity;
            // console.log(quantity)
            // console.log(id)
            await axios.put(url + "/" + id, {
                candyname, description, price, quantity
            })
        }
    });

    buy2_btn.addEventListener('click', async () => {
        if (quantity >= 2) {
            quantity = quantity - 2;
            quantitySpan.textContent = quantity;
            await axios.put(url + "/" + id, {
                candyname, description, price, quantity
            })
        }
    }
    );

    buy3_btn.addEventListener('click', async () => {
        if (quantity >= 3) {
            quantity = quantity - 3;
            quantitySpan.textContent = quantity;
            await axios.put(url + "/" + id, {
                candyname, description, price, quantity
            })
        }
    });
    delete_btn.addEventListener('click',async()=>{
        li.remove()
        await axios.delete(url+"/"+id)
    })
}   