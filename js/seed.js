(function(){
    $(document).ready(init);
    var firebaseConfig = {
        apiKey: "AIzaSyA2_P07vxDtJ9OoKN1OkXAFpMnuxOoZa7o",
        authDomain: "pointology-e397b.firebaseapp.com",
        databaseURL: "https://pointology-e397b.firebaseio.com",
        projectId: "pointology-e397b",
        storageBucket: "pointology-e397b.appspot.com",
        messagingSenderId: "404283995990",
        appId: "1:404283995990:web:fa100e3015ce504f2648f7"
    };
    uid = ""

    function init(){
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                uid = user.uid
            }
        });

        firebase.database().ref("Users/" + uid).on("child_added", (snapshot) => {
            let data = snapshot.val();
            if(data.Entries.MensEntrySubmitted){
                $(".mensNoEntry").css("display", "none");
                $(".mensEntry").css("display", "block");
            }

            if(data.Entries.WomensEntrySubmitted){
                $(".womensNoEntry").css("display", "none");
                $(".womensEntry").css("display", "block");
            }
        });

        firebase.database().ref("Seeds/Mens").on("value", (snapshot) => {
            let data = snapshot.val();
            let y = 1;
            let x = 1;
            $(".contain").css("height", "auto");
            $(".seed").css("height", "350px");

            for(let i = 0; i < data.MensSeedArray.length; i++){
                if(i === 64 || i === 65){
                    y = 11;
                }else if(i === 66 || i === 67){
                    y = 16;
                }else{
                    if(i % 4 === 0 && i != 0){
                        y++;
                    }
                }

                // p
                let p = document.createElement("p");

                // Label
                let label = document.createElement("label");
                p.appendChild(label);

                // input
                let input = document.createElement("input");
                input.type = "radio"
                input.name = "group" + y;
                input.value = data.MensSeedArray[i];
                label.appendChild(input);

                // span
                let span = document.createElement("Span");
                span.textContent = data.MensSeedArray[i];
                label.appendChild(span);

                if(i === 64 || i === 65){
                    $(".11").append(p);
                }else if(i === 66 || i === 67){
                    $(".16").append(p);
                }else{
                    if(i >= 4){
                        if(i % 4 === 0){
                            x++;
                            $("." + x).append(p);
                        }
                    }

                    $("." + x).append(p);
                }
            }
        });

        firebase.database().ref("Seeds/Womens").on("value", (snapshot) => {
            let data = snapshot.val();
            let y = 1;
            let x = 1;
            $(".contain").css("height", "auto");
            $(".seed").css("height", "350px");

            for(let i = 0; i < data.WomensSeedArray.length; i++){
                if(i === 64 || i === 65){
                    y = 11;
                }else if(i === 66 || i === 67){
                    y = 16;
                }else{
                    if(i % 4 === 0 && i != 0){
                        y++;
                    }
                }

                // p
                let p = document.createElement("p");

                // Label
                let label = document.createElement("label");
                p.appendChild(label);

                // input
                let input = document.createElement("input");
                input.type = "radio"
                input.name = "groupw" + y;
                input.value = data.WomensSeedArray[i];
                label.appendChild(input);

                // span
                let span = document.createElement("Span");
                span.textContent = data.WomensSeedArray[i];
                label.appendChild(span);

                if(i === 64 || i === 65){
                    $(".w11").append(p);
                }else if(i === 66 || i === 67){
                    $(".w16").append(p);
                }else{
                    if(i >= 4){
                        if(i % 4 === 0){
                            x++;
                            $(".w" + x).append(p);
                        }
                    }

                    $(".w" + x).append(p);
                }
            }
        });

        firebase.database().ref("Users/" + uid).on("child_added", (snapshot) => {
            let data = snapshot.val();
            if(data.Entries.MensEntrySubmitted){
                for(let i = 0; i < data.Entries.MensEntry.length; i++){
                    console.log(i+1);
                    let div = document.createElement("div");
                    div.classList.add("col");
                    div.classList.add("m3");
    
                    let h5 = document.createElement("h5");
                    h5.textContent = "Seed " + (i+1) + " Choice: ";
                    div.appendChild(h5);
    
                    let p = document.createElement("p");
                    p.textContent = data.Entries.MensEntry[i];
                    div.appendChild(p);
    
                    $(".mensEntry").append(div);
                }
    
                let score = document.createElement("h4");
                score.textContent = "Your current score is: ";
                $(score).css("padding-top", "30px !important");
    
                $(".mensEntry").append(score);
            }
        });

        firebase.database().ref("Users/" + uid).on("child_added", (snapshot) => {
            let data = snapshot.val();
            if(data.Entries.WomensEntrySubmitted){
                for(let i = 0; i < data.Entries.WomensEntry.length; i++){
                    console.log(i+1);
                    let div = document.createElement("div");
                    div.classList.add("col");
                    div.classList.add("m3");
    
                    let h5 = document.createElement("h5");
                    h5.textContent = "Seed " + (i+1) + " Choice: ";
                    div.appendChild(h5);
    
                    let p = document.createElement("p");
                    p.textContent = data.Entries.WomensEntry[i];
                    div.appendChild(p);
    
                    $(".womensEntry").append(div);
                }
    
                let score = document.createElement("h4");
                score.textContent = "Your current score is: ";
                $(score).css("padding-top", "30px !important");
    
                $(".womensEntry").append(score);
            }
        });        

        $('.tabs').tabs();
        $("#logout").on("click", logout);
        $("#submit").on("click", submitMens);
        $("#womensSubmit").on("click", submitWomens);
        $("#mensFillOut").on("click", showMensForm);
        $("#womensFillOut").on("click", showWomensForm);
    }

    function showWomensForm(){
        $(".womensNoEntry").css("display", "none");
        $("#womensFill").css("display", "block");
    }

    function showMensForm(){
        $(".mensNoEntry").css("display", "none");
        $("#mensFill").css("display", "block");
    }

    function submitWomens(){
        let arr = []
        for(let i = 1; i < 17; i++){
            arr.push($("input[name=groupw" + i + "]:checked").val());
        }

        firebase.database().ref("Users/" + uid + "/Entries").update({
            WomensEntry:arr
        }).then(() => {
            firebase.database().ref("Users/" + uid + "/Entries").child("WomensEntrySubmitted").transaction((entry) => {
                entry = true;
                return entry;
            });
        }).then(() => {
            firebase.database().ref("Admin/WomensEntries/").push({
                UID:uid,
                EntryArray:arr
            });
        }).then(() => {
            $(".entry").css("display", "block");
            $(".fillEntry").css("display", "none");
        });
    }

    function submitMens(){
        let arr = []
        for(let i = 1; i < 17; i++){
            arr.push($("input[name=group" + i + "]:checked").val());
        }

        firebase.database().ref("Users/" + uid + "/Entries").update({
            MensEntry:arr
        }).then(() => {
            firebase.database().ref("Users/" + uid + "/Entries").child("MensEntrySubmitted").transaction((entry) => {
                entry = true;
                return entry;
            });
        }).then(() => {
            firebase.database().ref("Admin/MensEntries/").push({
                UID:uid,
                EntryArray:arr
            });
        }).then(() => {
            $(".entry").css("display", "block");
            $(".fillEntry").css("display", "none");
        });
    }

    function logout(){
        firebase.auth().signOut().then(() => {
            location.replace("../html/index.html");
        });    
    }
})();