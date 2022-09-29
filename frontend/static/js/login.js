const BASE_URL = "https://cms.reventhedev.gq/api"
const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click",async(e)=>{
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const res =  await fetch(BASE_URL+'/login',{method:'POST',body:JSON.stringify({username:username,password:password})}).then(res=>{
        return res.json()
    })
    if(res.status==='ok'){
        window.localStorage.setItem('user',username)
        window.localStorage.setItem('role',res.role)
        window.localStorage.setItem('isLoggedIn',true)
        window.location.replace('dashboard.html')
    }
})