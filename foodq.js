// クイズのデータ
const quizzes = [
    {
        question: "フランス発祥の、カリカリの皮とモチモチの食感が特徴的なパンは？",
        answer: "バゲット",
        options: ["クロワッサン", "パンケーキ", "バゲット", "ブリオッシュ"],
        image: "./img/food_francepan.png"
    },
    {
        question: "イタリア料理で、チーズとトマトソースで作られる円形の料理は？",
        answer: "ピザ",
        options: ["パスタ", "リゾット", "ピザ", "ティラミス"],
        image: "./img/food_pizza.png"
    },
    {
        question: "日本の代表的な麺料理で、豚骨や醤油味のスープで食べられるものは？",
        answer: "ラーメン",
        options: ["そば", "うどん", "ラーメン", "焼きそば"],
        image: "./img/ramen_syouyu.png"
    },
    {
        question: "ジャガイモを細かく切って油で揚げた、ファストフードの定番は？",
        answer: "フライドポテト",
        options: ["オニオンリング", "チキンナゲット", "フライドポテト", "ポテトサラダ"],
        image: "./img/food_frenchfry.png"
    }
];

let currentQuizIndex = 0;
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const message = document.getElementById('message');
const foodImage = document.getElementById('food-image');
const imageContainer = document.getElementById('image-container');

// 配列をシャッフル
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 質問と選択肢を表示
function displayQuestion() {
    if (currentQuizIndex < quizzes.length) {
        const quiz = quizzes[currentQuizIndex];
        questionText.textContent = quiz.question;
        questionText.classList.add('fade-in');
        message.textContent = '';
        message.classList.remove('message-success', 'message-fail');
        nextButton.classList.add('hidden');
        imageContainer.classList.remove('visible');
        imageContainer.classList.add('hidden');
        optionsContainer.classList.remove('hidden');

        // 選択肢をシャッフル
        optionsContainer.innerHTML = '';
        const shuffledOptions = shuffle([...quiz.options]);
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-button');
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });
    } else {
        // クイズ終了
        questionText.textContent = 'クイズ終了です！お疲れ様でした！';
        questionText.classList.remove('pulse');
        optionsContainer.classList.add('hidden');
        message.textContent = '';
        nextButton.classList.add('hidden');
        imageContainer.classList.add('visible');
    }
}

// 回答チェック
function checkAnswer(selectedOption) {
    const correctAnswer = quizzes[currentQuizIndex].answer;
    const optionButtons = document.querySelectorAll('.option-button');
    
    // ボタン無効化
    optionButtons.forEach(button => {
        button.disabled = true;
        if (button.textContent === selectedOption) {
            if (selectedOption === correctAnswer) {
                button.classList.add('correct-button');
            } else {
                button.classList.add('incorrect-button');
            }
        }
        if (button.textContent === correctAnswer) {
            button.classList.add('correct-button');
        }
    });

    if (selectedOption === correctAnswer) {
        message.textContent = '正解です！🎉';
        message.classList.add('message-success', 'fade-in');
        foodImage.src = quizzes[currentQuizIndex].image;
        imageContainer.classList.remove('hidden');
        setTimeout(() => {
            imageContainer.classList.add('visible');
        }, 10);
        nextButton.classList.remove('hidden');
    } else {
        message.textContent = `残念、不正解...正解は「${correctAnswer}」でした！`;
        message.classList.add('message-fail', 'fade-in');
        nextButton.classList.remove('hidden');
    }
}

// 次の質問へ
    function nextQuestion() {
    currentQuizIndex++;
    displayQuestion();
}

// イベントリスナーの追加
document.addEventListener('DOMContentLoaded', () => {
    nextButton.addEventListener('click', nextQuestion);
    displayQuestion();
});

// raduis
document.querySelector(".square").animate(
  {
    borderRadius: [
      "50% 50% 50% 70%/30% 50%",
      "50% 30% 50% 70%/80% 50%",
      "50% 50% 50% 70%/30%",
    ]
  },
  {
    iterations: Infinity,
    direction: "alternate",
    duration: 9000
  }
);
