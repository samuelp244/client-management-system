const BASE_URL = "https://cms.reventhedev.gq/api"

const logoutBtn = document.getElementById("logoutBtn")

logoutBtn.addEventListener("click",(e)=>{
    window.localStorage.removeItem('isLoggedIn')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('role')
    window.location.replace('index.html')
})


let tableData = [];
let AlltableData = []
const username = window.localStorage.getItem('user')
const role = window.localStorage.getItem('role')
if(role==='client'){
    let x = document.getElementById('managerSelect')
    x.style.display = 'none'
}else if(role==='manager'){
    let x = document.getElementById('clientSelect')
    console.log(x)
    x.style.display = 'none'
}

const clientName = document.getElementById('clientName')
clientName.innerHTML = username 

let selectedId
let selectedValue
const tableOnChange = async(selectObj)=>{
    var idx = selectObj.id; 
    // console.log(selectObj.selectedIndex)
    var inputValue = selectObj.value; 
    if(inputValue==="NO"){
        openModal()
        selectedId = idx
        selectedValue = inputValue
    }else if(inputValue==="YES"){
        if(role==='client'){
            const res = await fetch(BASE_URL+'/addComment',{method:'POST',body:JSON.stringify({username:username,status:'YES',id:idx,comments:''})}).then(res=>{
                return res.json()
            })
            location.replace(location)
        }else if(role==='manager'){
            const res = await fetch(BASE_URL+'/addComment',{method:'POST',body:JSON.stringify({username:selectClient.value,status:'YES',id:idx,comments:''})}).then(res=>{
                return res.json()
            })
            location.replace(location)
        }
    }
}
////////////////////////////////modal////////////////////////////////////////////

const modal = document.querySelector('#my-modal');
// const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn')
cancelBtn.addEventListener('click',()=>{
    closeModal()
})
// Open
function openModal() {
    modal.style.display = 'block';
  }
  
  // Close
  function closeModal() {
    modal.style.display = 'none';
    location.replace(location)
  }
  
  // Close If Outside Click
  function outsideClick(e) {
    if (e.target == modal) {
      modal.style.display = 'none';
      location.replace(location)
    }
  }

  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', outsideClick);



const observationText = document.getElementById('observationText')
const okBtn = document.getElementById('okBtn');
okBtn.addEventListener('click',async()=>{
    const username = localStorage.getItem('user')
    const role = localStorage.getItem('role')
    if(role==='client'){
        const res =  await fetch(BASE_URL+'/addComment',{method:'POST',body:JSON.stringify({username:username,status:selectedValue,id:selectedId,comments:observationText.value})}).then(res=>{
            return res.json()
        })
        if(res.status==='ok'){
            closeModal()
        }
    }else if(role==='manager'){
        
        const res =  await fetch(BASE_URL+'/addComment',{method:'POST',body:JSON.stringify({username:selectClient.value,status:selectedValue,id:selectedId,comments:observationText.value})}).then(res=>{
            return res.json()
        })
        if(res.status==='ok'){
            closeModal()
        }
    }
    
})
////////////////////////////////modal////////////////////////////////////////////


const buildTable = (data)=>{
    let table = document.getElementById('myTable')
    table.innerHTML = null
    for(let i=0;i<data.length;i++){
        let row = `<tr>
                        <th class="text-center" scope="row">${data[i].articleId}</th>
                        <td class="text-center"><a href="${data[i].articleUrl}">${data[i].articleUrl}</a></td>
                        <td class="text-center"><select value=${data[i].status} id=${data[i]._id} onchange="tableOnChange(this)">
                            <option value="YES" ${data[i].status==='YES'?'selected':''}>YES</option>
                            <option value="NO" ${data[i].status==='NO'?'selected':''}>NO</option>
                        </select></td>
                        <td class="text-center">${data[i].comments}</td>
                    </tr>`
        table.innerHTML += row
    }
}

const selectClient = document.getElementById('selectClient')
selectClient.addEventListener('change',()=>{
    if(selectClient.value==='client1'){
        let tabledata = AlltableData.find(x=>x.username==='client1')
        console.log(tabledata)
        buildTable(tabledata.data)
    }else if(selectClient.value==='client2'){
        let tabledata = AlltableData.find(x=>x.username==='client2')
        console.log(tabledata.data)
        buildTable(tabledata.data)
    }
})

const tableRow = document.getElementById('tableRow')
console.log(tableRow)


window.onload = async()=>{
    if(role==='client'){
        const res =  await fetch(BASE_URL+'/getClientData?username='+username,{method:'GET'}).then(res=>{
            return res.json()
        })
        tableData = res.data[0].data;
        console.log(tableData)
        buildTable(tableData)
    }else if(role==='manager'){
        const res =  await fetch(BASE_URL+'/getAllClientData',{method:'GET'}).then(res=>{
            return res.json()
        })
        AlltableData = res.data;
        // console.log(AlltableData[1])
        buildTable(AlltableData[0].data)
    }
    
}

