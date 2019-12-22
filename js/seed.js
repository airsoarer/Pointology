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
    uid = "";
    userTotal = 0;

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

            $("#mensPointScore").css("color", "#99BADD");
            $("#womensPointScore").css("color", "#FFFFFF");

            // console.log(data);
            let score = data.Entries.MensScore;
            $("#score").text(score.toString() + "pts");
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

        // Post Mens Teams and the Score
        firebase.database().ref("Users/" + uid).on("child_added", (snapshot) => {
            let data = snapshot.val();
            if(data.Entries.MensEntrySubmitted){
                for(let i = 0; i < data.Entries.MensEntry.length; i++){
                    // console.log(i+1);
                    let div = document.createElement("div");
                    div.classList.add("col");
                    div.classList.add("s6");
                    div.classList.add("m3");
    
                    let h5 = document.createElement("h5");
                    h5.textContent = "Seed " + (i+1) + " Choice: ";
                    div.appendChild(h5);

                    let p = document.createElement("p");

                    let ref = data.Entries.MensEntry[i];

                    firebase.database().ref("Seeds/Mens/TeamsScore").on("value", (snapshot) => {
                        let dataTwo = snapshot.val();
                        let team = dataTwo[ref];
                        let total = 0;
                        for(i in team){
                            total += parseInt(team[i]);
                        }

                        p.textContent = ref + ": " + total + "pts";
                        div.appendChild(p);
                    })

                    $(".mensEntry").append(div);

                    firebase.database().ref("Seeds/Mens/TeamsScore/" + data.Entries.MensEntry[i]).on("value", (snapshot) => {
                        let dataTwo = snapshot.val();
                        for(i in dataTwo){
                            userTotal += parseInt(dataTwo[i]);
                        }

                        if(userTotal > data.Entries.MensScore){
                            firebase.database().ref("Users/" + uid + "/Entries").child("MensScore").transaction((Value) => {
                                Value = userTotal;
                                return Value;
                            }).then(() => {
                                $("#score").text(data.Entries.MensScore + "pts")
                            });
                        }else{
                            $("#score").text(data.Entries.MensScore + "pts");
                        }
                    });
                }
    
                let score = document.createElement("h4");
                score.textContent = "Your current score is: ";
                $(score).css("padding-top", "30px !important");
    
                // $(".mensEntry").append(score);
            }

            // console.log(data);
        });

        // Post Womens teams and the scores
        firebase.database().ref("Users/" + uid).on("child_added", (snapshot) => {
            let data = snapshot.val();
            if(data.Entries.WomensEntrySubmitted){
                for(let i = 0; i < data.Entries.WomensEntry.length; i++){
                    let div = document.createElement("div");
                    div.classList.add("col");
                    div.classList.add("s6");
                    div.classList.add("m3");
    
                    let h5 = document.createElement("h5");
                    h5.textContent = "Seed " + (i+1) + " Choice: ";
                    div.appendChild(h5);
    
                    let p = document.createElement("p");

                    let ref = data.Entries.WomensEntry[i];

                    firebase.database().ref("Seeds/Womens/TeamsScore").on("value", (snapshot) => {
                        let dataTwo = snapshot.val();
                        let team = dataTwo[ref];
                        let total = 0;
                        for(i in team){
                            total += parseInt(team[i]);
                        }

                        p.textContent = ref + ": " + total + "pts";
                        div.appendChild(p);
                    })
    
                    $(".womensEntry").append(div);

                    firebase.database().ref("Seeds/Womens/TeamsScore/" + data.Entries.WomensEntry[i]).on("value", (snapshot) => {
                        let dataTwo = snapshot.val();
                        for(i in dataTwo){
                            userTotal += parseInt(dataTwo[i]);
                        }

                        if(userTotal > data.Entries.MensScore){
                            firebase.database().ref("Users/" + uid + "/Entries").child("WomensScore").transaction((Value) => {
                                Value = userTotal;
                                return Value;
                            });
                        }
                    });
                }
    
                let score = document.createElement("h4");
                score.textContent = "Your current score is: ";
                $(score).css("padding-top", "30px !important");
    
                // $(".womensEntry").append(score);
            }
        });

        // mensPoints();

        $('.tabs').tabs();
        $("#logout").on("click", logout);
        $("#submit").on("click", submitMens);
        $("#womensSubmit").on("click", submitWomens);
        $("#mensFillOut").on("click", showMensForm);
        $("#womensFillOut").on("click", showWomensForm);
        $("#mensPointScore").on("click", mensPoints);
        $("#womensPointScore").on("click", womensPoints);
    }

    function mensPoints(){
        $("#mensPointScore").css("color", "#99BADD");
        $("#womensPointScore").css("color", "#FFFFFF");
        firebase.database().ref("Users/" + uid).on("value", (snapshot) => {
            let data = snapshot.val();
            console.log(data);
            let score = data.Entries.MensScore;
            $("#score").text(score.toString() + "pts");
        });
    }

    function womensPoints(){
        $("#womensPointScore").css("color", "#99BADD");
        $("#mensPointScore").css("color", "#FFFFFF");
        firebase.database().ref("Users/" + uid).on("value", (snapshot) => {
            let data = snapshot.val();
            console.log(data);
            $("#score").text(data.Entries.WomensScore.toString() + "pts");
        });
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