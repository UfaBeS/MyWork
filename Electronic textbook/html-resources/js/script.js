var convertedWords = ["class", "using", "true", "if", "while", "try", "catch", "finally", "static", "throw", "namespace", "public", "async", "await", "this", "lock ", "bool", "object", "delegate", "private", "return", "foreach", "var", "int", " in", "for",
 "void", "new", "string", 
 " ThreadStart",  " Thread ", " Thread", "Program", "Console", "ParameterizedThreadStart", "Counter", "Reader", "AutoResetEvent", "Marshal", "ParallelLoopState", "ParallelLoopResult", "CancellationTokenSource",
 "OperationCanceledException", "Exception ", "CancellationToken", "ParallelOptions", "Parallel", "ValueTask", "Int32", "IAsyncResult", "TimerCallback", "Timer", " Mutex", "Book", "DisplayHandler", "Semaphore", "TaskCreationOptions", 
 " Task", " Thread."]

var convertedWordsStyle = ["blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord",
"blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", "blueWord", 
"classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord",
"classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord", "classWord"]

var answers = [2, 3, 4, 1, 2, 1, 3, 1, 1, 1]

function openOrCloseMenu(number)
{
	var menu = document.getElementById('ul' + number);
	if(menu.style.display == "none") 
	{
		menu.style.display = "block";
	}
	else
	{
		menu.style.display = "none";
	}
}


function preConvert() 
{
	var allpres = document.getElementsByTagName("pre");
	var codepres = [];
	var borderpres = [];
	for (var i = 0; i < allpres.length; i++) 
	{
		if (allpres[i].className == "codepre") 
		{
			codepres.push(allpres[i]);
		}
		else if (allpres[i].className == "borderpre")
		{
			borderpres.push(allpres[i]);
		}
	}

	for (var i = 0; i < codepres.length; i++) 
	{
		for (var j = 0; j < convertedWords.length; j++)
		{
			var index = codepres[i].innerHTML.indexOf(convertedWords[j], 0);
			while (index != -1) 
			{
				var insert = '<span class="' + convertedWordsStyle[j] + '">' + convertedWords[j] + '</span>';
				var result = [codepres[i].innerHTML.slice(0, index), insert, codepres[i].innerHTML.slice(index + convertedWords[j].length)].join('');
				codepres[i].innerHTML = result;
				index += insert.length;
				index = codepres[i].innerHTML.indexOf(convertedWords[j], index);
			}
		}

		codepres[i].innerHTML = commentsColor(codepres[i].innerHTML);
		codepres[i].innerHTML = rowAlignment(codepres[i].innerHTML);
	}

	for (var i = 0; i < borderpres.length; i++) 
	{
		borderpres[i].innerHTML = rowAlignment(borderpres[i].innerHTML, "> ");
	}
}

function commentsColor(innerHTML)
{
	var index = innerHTML.indexOf("//", 0);
	while (index != -1) 
	{
		var insertLength = innerHTML.indexOf("\n", index);
		var insert = '<span class="greenComment">' + innerHTML.slice(index, insertLength) + '</span>';
		var result = [innerHTML.slice(0, index), insert, innerHTML.slice(insertLength)].join('');
		innerHTML = result;
		index += insert.length; 
		index = innerHTML.indexOf("//", index);
	}

	return innerHTML;
}

function rowAlignment(innerHTML, insertion)
{
	if (insertion == undefined) 
	{
		insertion = "";
	}

	var splittedRows =  innerHTML.split(/\n/);
	var counter = 0;
	for (var j = 0; j < splittedRows[0].length; j++)
	{
		if (splittedRows[0][j] == ' ')
		{
			counter++;
			continue;
		}

		break;
	}

	splittedRows.pop();
	for (var j = 0; j < splittedRows.length; j++) 
	{
		splittedRows[j] = insertion + splittedRows[j].slice(counter, splittedRows[j].length) + "\n";
	}

	innerHTML = splittedRows.join('');
	return innerHTML;
}

function startTest()
{
	var startTest = document.getElementById("startTest");
	startTest.hidden = true;
	var endTest = document.getElementById("endTest");
	endTest.hidden = false;
	var q = document.getElementById("questions");
	q.hidden = false;
}

function endTest()
{
	var estimate = 0;
	for (var i = 0; i < 10; i++) 
	{
		var radios = document.getElementsByName('q' + (i + 1));
		var flag = true;
		for (var j = 0; j < radios.length; j++) 
		{
			if (radios[j].checked == true)
			{
				flag = false;
				if (answers[i] == j + 1)
				{
					estimate++;
				}
				break;
			}
		}

		if (flag == true)
		{
			alert('Для завершения теста необходимо ответить на все вопросы!');
			return;
		}
	}

	var ocenka = 0;
	if (estimate >= 9) {
		ocenka = 5;
	}
	else if (estimate >=7) {
		ocenka = 4;
	}
	else if (estimate >=5) {
		ocenka = 3;
	}
	else{
		ocenka = 2;
	}
	var repeatTest = document.getElementById("repeatTest");
	repeatTest.hidden = false;
	var endTest = document.getElementById("endTest");
	endTest.hidden = true;
	var q = document.getElementById("questions");
	q.hidden = true;
	var estimateText = document.getElementById("estimate");
	estimateText.hidden = false;
	estimateText.textContent = "Ваш результат составил " + estimate + " из 10. Оценка за тест - " + ocenka;
}

function repeatTest()
{
	var repeatTest = document.getElementById("repeatTest");
	repeatTest.hidden = true;
	var q = document.getElementById("questions");
	q.hidden = false;
	var estimateText = document.getElementById("estimate");
	estimateText.hidden = true;
	var endTest = document.getElementById("endTest");
	endTest.hidden = false;
}