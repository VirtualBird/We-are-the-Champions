import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:    "https://we-are-the-champions-a2fe4-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("textarea-input");
const inputFieldFromEl = document.getElementById("textarea-from-input");
const inputFieldToEl = document.getElementById("textarea-to-input");

const publishButtonEl = document.getElementById("publish-btn");
const endorsementListEl = document.getElementById("endorsements-list")

publishButtonEl.addEventListener("click", function(){
    let inputObject = {
        input: inputFieldEl.value,
        fromUser: inputFieldFromEl.value,
        toUser: inputFieldToEl.value,
    }
    
    /*  Alert user if input field is empty  */
    if (inputObject["input"] == ""){  
        alert("Alert: Please enter something into the endorsement text field");
    }
    else{
        push(endorsementsInDB, inputObject);
        clearInput();
    }
})

onValue(endorsementsInDB, function(snapshot){
    if (snapshot.exists())
    {
        let endorsementsArray = Object.values(snapshot.val());
        
        clearEndorsementsListEl();
        for (let i = endorsementsArray.length-1; i >= 0; i--)
        {
            addToList(endorsementsArray[i]);
        }
    }
    else {
        endorsementListEl.innerHTML = "No endorsements yet..."
    }
})

function clearInput()
{
    inputFieldEl.value = "";
    inputFieldFromEl.value = "";
    inputFieldToEl.value = "";
}

function clearEndorsementsListEl()
{
    endorsementListEl.innerHTML = ""
}

function addToList(valueToAdd)
{
    let inputValue = valueToAdd["input"];
    let fromUser = valueToAdd["fromUser"];
    let toUser = valueToAdd["toUser"];
    
    if (toUser == "")
    {
        toUser = "an anonymous user";
    }
    
    if (fromUser == "")
    {
        fromUser = "an anonymous user";
    }
    
    endorsementListEl.innerHTML +=  `<li>
                                        <p class="user">To ${toUser}</p>
                                        <p>${inputValue}</p>
                                        <p class="user">From ${fromUser}</p>
                                    </li>`
}