'use strict';
window.onload = (function() {

	function Test() {
		this.init();
	}
  
	Test.prototype.getTemplate = function () {
		var tmplTest = document.getElementById('grid-template').innerHTML;
		tmplTest = _.template(tmplTest);

		document.getElementsByClassName('section')[0].innerHTML += tmplTest({
		  list: questionsData
		});

		var tmplButton = document.getElementById('button').innerHTML;
		tmplButton = _.template(tmplButton);

		document.getElementsByClassName('section')[0].innerHTML += tmplButton({

		});

		var tmplModal = document.getElementById('modal').innerHTML;
		tmplModal = _.template(tmplModal);

		document.getElementsByClassName('section')[0].innerHTML += tmplModal({

		});
	};

	Test.prototype.localStorageInit = function(obj) {
		localStorage.setItem('testObject', JSON.stringify(obj));
		var textObj = localStorage.getItem('testObject');
		return JSON.parse(textObj);
	};

	Test.prototype.checkCorrectAnswer = function () {
		var self = this;
		var allAnswers = questionsData.length;
		var answer = this.localStorageInit(questionsData);
		var inputs = Array.prototype.slice.call(document.getElementsByClassName('answer'));
		var checkButton =  document.getElementsByClassName('check-button')[0];
		checkButton.addEventListener('click', function () {
			self.countAnswer = 0;
			self.correctAnswers = new Array(questionsData.length);
			inputs.forEach(function (el) {
				var dataQuestion = el.getAttribute('data-question');
				var dataId = el.getAttribute('data-id');
				var answer = questionsData[dataQuestion].answers[dataId];

				if (answer.isRight && el.checked && self.correctAnswers[dataQuestion] !== false) {
					self.correctAnswers[dataQuestion] = true;
				} else if (answer.isRight && !el.checked || !answer.isRight && el.checked) {
	        self.correctAnswers[dataQuestion] = false;
	      }
			});

			for (var i = 0; i < self.correctAnswers.length; i++) {
				if (!self.correctAnswers[i]) {
					self.countAnswer = self.countAnswer;
				} else {
					self.countAnswer++;
				}
			}
		});

	};

	Test.prototype.clearCheckboxes = function () {
		var checkboxes = document.getElementsByClassName('answer');
		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = false;
		}
	}

	Test.prototype.init = function () {
		this.getTemplate();
		this.checkCorrectAnswer();
	};

window.Test = new Test;

})();
