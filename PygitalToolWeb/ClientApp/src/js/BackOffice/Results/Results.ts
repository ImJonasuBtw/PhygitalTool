import {getAllAnswersWithQuestions} from "./ResultRestClient";


document.addEventListener('DOMContentLoaded', function (this: Document) {
    var clickableCards = document.querySelectorAll('.clickable');
    clickableCards.forEach(function (card) {
        card.addEventListener('click', function (this: HTMLElement) {
            var url = this.getAttribute('data-href');
            if (url !== null) {
                window.location.href = url;
            } else {
                console.error("Data-href attribute is null");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.results-btn');
    // Add a click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if(this){
                // @ts-ignore
                var url = this.getAttribute('data-href');
                if (url !== null) {
                    window.location.href = url;
                } else {
                    console.error("Data-href attribute is null");
                }
            }
        });
    });
});





document.addEventListener('click', function (event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('export-chart')) {
        const canvasId = target.getAttribute('data-canvas-id');
        // @ts-ignore
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement; // Typecasting naar HTMLCanvasElement
        if (canvas) {
            exportChartAsPNG(canvas, 'chart_export');
        } else {
            console.error('Canvas not found');
        }
    } 
});

window.addEventListener('load', () => {
    getAllAnswersWithQuestions();
});

export function exportChartAsPNG(canvas: HTMLCanvasElement, filename: string) {
    // Genereer een dataURL voor het canvas
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportDataAsXLS(data: any[], filename: string) {
    let html = '<table>';
    html += '<tr>';
    html += '<th>Answer ID</th><th>Answer Text</th><th>Question ID</th><th>Question Text</th><th>Question Type</th>'; // Koppen toevoegen
    html += '</tr>';
    data.forEach((row) => {
        html += '<tr>';
        html += `<td>${row.answerId}</td><td>${row.answerText}</td><td>${row.questionId}</td>`; // Voeg antwoordgegevens toe
        html += `<td>${row.question.questionText}</td><td>${getQuestionTypeName(row.question.questionType)}</td>`; // Voeg vraaggegevens toe
        html += '</tr>';
    });
    html += '</table>';
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.xls`);document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportDataAsCSV(data: any[], filename: string) {
    let csv = 'Answer ID,Answer Text,Question ID,Question,Question Text,Question Type\n';
    data.forEach((row) => {
        csv += `${row.answerId},${row.answerText},${row.question.questionId},${row.question.questionText},${getQuestionTypeName(row.question.questionType)}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function getQuestionTypeName(questionType: number): string {
    switch (questionType) {
        case 0:
            return 'SingleChoice';
        case 1:
            return 'MultipleChoice';
        case 2:
            return 'Range';
        case 3:
            return 'Open';
        default:
            return 'Unknown';
    }
}


