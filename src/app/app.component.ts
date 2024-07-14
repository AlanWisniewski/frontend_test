import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ZadRekrut';
  texts: any[] = [];
  selectedOption: number | null = null;
  showDropdown = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTexts();
  }

  fetchTexts() {
    this.http.get<any>('assets/data.json').subscribe(
      data => {
        this.texts = data.texts;
      },
      error => {
        console.error('Błąd podczas pobierania danych z JSONa:', error);
      }
    );
  }

  handleOptionClick(option: number) {
    this.selectedOption = option;
  }

  handleButtonClick(action: string) {
    if (this.selectedOption !== null && this.selectedOption >= 1 && this.selectedOption <= 6) {
      let selectedText: string;
  
      if (this.selectedOption === 3) {
        const randomIndex = Math.floor(Math.random() * 6);
        selectedText = this.texts[randomIndex].content;
      } else {
        selectedText = this.texts[this.selectedOption - 1].content;
      }
  
      const textContainer = document.getElementById('textContainer');
      if (textContainer) {
        if (action === 'replace') {
          textContainer.innerHTML = selectedText;
        } else if (action === 'append') {
          textContainer.innerHTML += selectedText;
        }
      }
    }
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  resetPage() {
    window.location.reload();
    this.showDropdown = false;
  }

  appendName() {
    const headerH2 = document.querySelector('header h2');
    if (headerH2) {
      headerH2.innerHTML += '<br>Alan Wisniewski';
    }
    this.showDropdown = false;
  }
  
}