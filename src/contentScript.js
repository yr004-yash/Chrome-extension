import {load} from './cheerio';


        var extra = document.getElementById("change-title-photo").parentElement;
        console.log(extra);

        const newNode = document.createElement("input");
        newNode.setAttribute("class", "clr");

        const newNode1 = document.createElement("input");
        newNode1.setAttribute("class", "clr1");

        const newNode3 = document.createElement("button");
        newNode3.innerHTML = "Submit";
        newNode3.setAttribute("class", "submitt");

        const info1 = document.createElement("li");
        info1.innerHTML="Enter ID of the college";
        info1.setAttribute("class", "info11");

        const info2 = document.createElement("li");
        info2.innerHTML="Enter ID of the contest";
        info2.setAttribute("class", "info11");

        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        const br3 = document.createElement("br");
        const br4 = document.createElement("br");


        extra.insertBefore(br4,extra.children[0]);
        extra.insertBefore(br3,extra.children[0]);
        extra.insertBefore(newNode3, extra.children[0]);
        extra.insertBefore(br2,extra.children[0]);
        extra.insertBefore(newNode1, extra.children[0]);
        extra.insertBefore(info2,extra.children[0]);
        extra.insertBefore(br1,extra.children[0]);
        extra.insertBefore(newNode, extra.children[0]);
        extra.insertBefore(info1,extra.children[0]);
    


var touch = document.getElementsByClassName("submitt")[0];
var total="";
const info = async (event) => {
    var cid = document.getElementsByClassName("clr")[0].value;
    var contestid = document.getElementsByClassName("clr1")[0].value;
    var userbo=document.getElementsByClassName("userbox")[0];
    if(total!=""){
        userbo.innerHTML-=total;
    }
    if (cid != "" && contestid != "") {
        try {
            var url11 = `https://codeforces.com/ratings/organization/${cid}`;
            const original1 = await fetch(url11);
            const html1 = await original1.text();
            const $ = load(html1);
            //4520i1
            var list = [],colorr=[], cnt = 0;
            const z = $("#pageContent").find('div:eq(3)').find('div:eq(6)').find('table:eq(0)').find('tbody:eq(0)');
            console.log(z);
            $(z).children().each((i) => {
                
                const res = z.find(`tr:eq(${i})`).find('td:eq(1)').find('a:eq(0)').text();
                const clss= z.find(`tr:eq(${i})`).find('td:eq(1)').find('a:eq(0)').attr('class');
                console.log(clss);
                if(clss!=undefined){
                    list.push(res);
                    var cssl=clss.split(" ");
                    colorr.push(cssl[1]);
                }
            });
            console.log(list);

            var colorss={
                "user-red":"red !important",
                "user-orange":"#ff8c00!important",
                "user-violet":"#a0a!important",
                "user-blue":"blue !important",
                "user-cyan":"#03a89e!important",
                "user-green":"green !important",
                "user-gray":"gray !important"
            };
            ///////////////////WEBScraping//////////////////////////////
            // var urlscrap = `http://localhost:3000/cfextension1/${cid}`;
            // const soriginal = await fetch(urlscrap, {
            //     method: 'POST',
            // });
            // var sdata = await soriginal.json();
            // console.log(sdata.list);
            // console.log(sdata);
            ////////////////////////////////////////////////////////////
            var url = `https://codeforces.com/api/contest.standings?contestId=${contestid}&from=1&count=10000`;
            const original = await fetch(url, {
                method: 'GET',
            });
            var data = await original.json();
            var arrData = [data];
            
            total += `<br><br><div class="xdd" style="color: #445f9d; text-decoration: none;">${arrData[0].result.contest.name}</div>`;
            total += `<div class="xd">Final standings</div><br><br>`;
            total += `<center><div class="center"><table class="blue">`;
            total += `<tr class="hero-text;">`;
            total += ` <td class="aaaa tsize k"><center><b>#</b></center></td>
                    <td class="aaaa tsize k"><center><b>Who</b></center></td> 
                    <td class="aaaa tsize k"><center><b>=</b></center></td>
                    <td class="aaaa tsize k"><center><b>Penalty</b></center></td>`;

            for (i = 0 + 65; i < arrData[0].result.problems.length + 65; i++) {
                var x = String.fromCharCode(i);
                total += ` <td class="aaaa tsize"><center><a href="https://codeforces.com/contest/${contestid}/problem/${x}" style="color:#00c"><b>${x}</b></a></center></td> `;
            }
            total += `</tr>`;
            //console.log(sdata.list.indexOf("hetulshah14"));
            var cnt = 0;
            for (var i of arrData[0].result.rows) {
                var xx = list.indexOf(i.party.members[0].handle);
                if (xx > -1) {
                    cnt++;
                    if (cnt % 2) {
                        total +=`
                                <tr class="hero-text xx;">
                                <td class="aaaa tsize k xx pelu"><center>${i.rank}</center></td>
                                <td class="aaaa tsize k xx" ><center><b><a href="https://codeforces.com/profile/${i.party.members[0].handle}" style="text-decoration:none;color:${colorss[colorr[xx]]}">${i.party.members[0].handle}<a></b></center></td> 
                                <td class="aaaa tsize k xx pelu"><center>${i.points}</center></td>
                                <td class="aaaa tsize k xx pelu"><center>${i.penalty}</center></td>
                                `;
                        for (var j = 0; j < arrData[0].result.problems.length; j++) {
                            //console.log(i.problemResults[j].points);
                            //console.log(i.problemResults[j].rejectedAttemptCount);
                            if (i.problemResults[j].points == 1) {
                                if (i.problemResults[j].rejectedAttemptCount != 0) {
                                    total += ` <td class="aaaa tsize k green xx"><center>+${i.problemResults[j].rejectedAttemptCount}</center></td> `;
                                }
                                else total += ` <td class="aaaa tsize k green xx"><center>+<b></b></center></td> `;
                            }
                            else if (i.problemResults[j].points > 1) {
                                total += ` <td class="aaaa tsize k green xx"><center>${i.problemResults[j].points}</center></td> `;
                            }
                            else {
                                if (i.problemResults[j].rejectedAttemptCount != 0) { total += `<td class="aaaa k xx rej"><center>-${i.problemResults[j].rejectedAttemptCount}</center></td>`; }
                                else total += `<td class="xx"></td>`;
                            }

                        }
                    }
                    else {
                        total += `
                                <tr class="hero-text yy;">
                                <td class="aaaa tsize k yy pelu"><center>${i.rank}</center></td>
                                <td class="aaaa tsize k yy "><center><b><a href="https://codeforces.com/profile/${i.party.members[0].handle}" style="text-decoration:none;color:${colorss[colorr[xx]]}">${i.party.members[0].handle}<a></b></center></td> 
                                <td class="aaaa tsize k yy pelu"><center>${i.points}</center></td>
                                <td class="aaaa tsize k yy pelu"><center>${i.penalty}</center></td>
                                `;
                        for (j = 0; j < arrData[0].result.problems.length; j++) {
                            if (i.problemResults[j].points == 1) {
                                if (i.problemResults[j].rejectedAttemptCount != 0) {
                                    total += ` <td class="aaaa tsize k green yy"><center>+${i.problemResults[j].rejectedAttemptCount}</center></td> `;
                                }
                                else total += ` <td class="aaaa tsize k green yy"><center>+<b></b></center></td> `;
                            }
                            else if (i.problemResults[j].points > 1) {
                                total += ` <td class="aaaa tsize k green yy"><center>${i.problemResults[j].points}</center></td> `;
                            }
                            else {
                                if (i.problemResults[j].rejectedAttemptCount != 0) { total += `<td class="aaaa yy k rej"><center>-${i.problemResults[j].rejectedAttemptCount}</center></td>`; }
                                else total += `<td class="yy"></td>`;
                            }

                        }
                    }
                    total += `</tr>`;

                }

            }
            total += `</table></p></center><br><br>`;
            //2668 1845
            
            
            userbo.innerHTML += total;
        }
        catch (err) { console.log(err); }
    }
    else {
        document.getElementsByClassName("deta")[0].innerText = "Please fill both the field";
    }
}
touch.addEventListener("click", info);

