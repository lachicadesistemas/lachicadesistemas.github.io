// Questions for the test
const questions = [
    {
        type: 'true-false',
        question: 'En Linux, el comando "ls -l" muestra los archivos en formato largo.',
        answer: true
    },
    {
        type: 'multiple-choice',
        question: '¿Cuál es el directorio raíz en Linux?',
        options: ['/root', '/home', '/', '/usr'],
        answer: 2
    },
    {
        type: 'true-false',
        question: 'El comando "chmod 777" da permisos de lectura, escritura y ejecución a todos los usuarios.',
        answer: true
    },
    {
        type: 'multiple-choice',
        question: '¿Qué comando se usa para ver el contenido de un archivo?',
        options: ['cat', 'dog', 'mouse', 'bird'],
        answer: 0
    },
    {
        type: 'true-false',
        question: 'En Linux, los archivos ocultos comienzan con un punto (.).',
        answer: true
    },
    {
        type: 'multiple-choice',
        question: '¿Qué comando se usa para crear un nuevo directorio?',
        options: ['newdir', 'mkdir', 'createdir', 'makedir'],
        answer: 1
    },
    {
        type: 'true-false',
        question: 'El comando "sudo" permite ejecutar comandos con privilegios de administrador.',
        answer: true
    },
    {
        type: 'multiple-choice',
        question: '¿Qué comando se usa para cambiar de directorio?',
        options: ['cd', 'change', 'dir', 'move'],
        answer: 0
    },
    {
        type: 'true-false',
        question: 'En Linux, el comando "rm -rf" elimina archivos y directorios de forma recursiva y forzada.',
        answer: true
    },
    {
        type: 'multiple-choice',
        question: '¿Qué comando se usa para ver el manual de un comando?',
        options: ['help', 'manual', 'man', 'info'],
        answer: 2
    },
    {
        type: 'true-false',
        question: 'El comando "grep" se usa para buscar texto en archivos.',
        answer: true
    },
    {
        type: 'multiple-choice',
        question: '¿Qué comando se usa para ver el espacio en disco?',
        options: ['df', 'du', 'space', 'disk'],
        answer: 0
    },
    {
        type: 'true-false',
        question: 'En Linux, el comando "ps" muestra los procesos en ejecución.',
        answer: true
    },
    {
        type: 'multiple-choice',
        question: '¿Qué comando se usa para ver el contenido de un archivo página por página?',
        options: ['more', 'less', 'page', 'view'],
        answer: 1
    },
    {
        type: 'true-false',
        question: 'El comando "tar" se usa para comprimir archivos.',
        answer: true
    },
    {
        type: 'multiple-choice',
        question: '¿Qué comando se usa para ver la fecha y hora del sistema?',
        options: ['time', 'date', 'clock', 'now'],
        answer: 1
    },
    {
        type: 'true-false',
        question: 'En Linux, el comando "kill" se usa para terminar procesos.',
        answer: true
    },
    {
        type: 'multiple-choice',
        question: '¿Qué comando se usa para ver el historial de comandos?',
        options: ['history', 'past', 'log', 'previous'],
        answer: 0
    },
    {
        type: 'true-false',
        question: 'El comando "wget" se usa para descargar archivos de internet.',
        answer: true
    }
];

let currentQuestion = 0;
let score = 0;
let userName = '';
let answers = [];

function startTest() {
    userName = document.getElementById('name').value.trim();
    if (!userName) {
        alert('Por favor, ingresa tu nombre');
        return;
    }

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('test-screen').classList.remove('hidden');
    showQuestion();
    updateProgress();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    if (question.type === 'true-false') {
        ['Verdadero', 'Falso'].forEach((option, index) => {
            const button = document.createElement('div');
            button.className = 'option';
            button.textContent = option;
            button.onclick = () => selectAnswer(index === 0);
            optionsContainer.appendChild(button);
        });
    } else {
        question.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.className = 'option';
            button.textContent = option;
            button.onclick = () => selectAnswer(index);
            optionsContainer.appendChild(button);
        });
    }
}

function selectAnswer(answer) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    event.target.classList.add('selected');
    
    answers[currentQuestion] = answer;
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) {
        alert('Por favor, selecciona una respuesta');
        return;
    }

    const question = questions[currentQuestion];
    const isCorrect = answers[currentQuestion] === question.answer;
    
    if (isCorrect) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
    }

    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        setTimeout(() => {
            showQuestion();
            updateProgress();
            document.getElementById('next-btn').disabled = true;
        }, 1000);
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function showResults() {
    document.getElementById('test-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-name').textContent = userName;
    document.getElementById('result-score').textContent = `${score}/${questions.length}`;
}

function restartTest() {
    currentQuestion = 0;
    score = 0;
    answers = [];
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('name').value = '';
}

function downloadCertificate() {
    const canvas = document.getElementById('certificate-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 5;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Title
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificado de Completitud', canvas.width/2, 150);
    
    // Content
    ctx.font = '24px Arial';
    ctx.fillText(`¡Felicitaciones ${userName}!`, canvas.width/2, 250);
    ctx.fillText('Has completado exitosamente el', canvas.width/2, 300);
    ctx.fillText('Examen de Administración Linux Básico', canvas.width/2, 350);
    ctx.fillText(`Con un puntaje de: ${score}/${questions.length}`, canvas.width/2, 400);
    
    // Date
    const date = new Date().toLocaleDateString('es-ES');
    ctx.font = '20px Arial';
    ctx.fillText(`Fecha: ${date}`, canvas.width/2, 500);
    
    // Download link
    const link = document.createElement('a');
    link.download = `certificado-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
} 
