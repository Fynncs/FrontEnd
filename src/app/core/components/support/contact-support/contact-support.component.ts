import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComumModule } from '@fynnc.module';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-contact-support',
  imports: [ComumModule],
  templateUrl: './contact-support.component.html',
  styleUrl: './contact-support.component.scss'
})
export class ContactSupportComponent {

  async tirarPrint() {
    const elemento = document.body;

    const elementosComColor = document.querySelectorAll('*');
    const estilosOriginais: { elem: Element; color: string | null }[] = [];
  
    elementosComColor.forEach((elem) => {
      const computedStyle = window.getComputedStyle(elem);
      if (computedStyle.backgroundColor.includes('color(')) {
        estilosOriginais.push({ elem, color: elem.getAttribute('style') });
        (elem as HTMLElement).style.backgroundColor = 'white'; 
      }
    });
    try {
      const canvas = await html2canvas(elemento, { scale: 2 });
      const imagem = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = imagem;
      link.download = 'screenshot.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (erro) {
      console.error('Erro ao capturar a tela:', erro);
    } finally {
      estilosOriginais.forEach(({ elem, color }) => {
        if (color) {
          elem.setAttribute('style', color);
        } else {
          elem.removeAttribute('style');
        }
      });
    }
  }
  abrirDialogo() {
    this.dialog.open(RelatarBugComponent, {
      width: '400px',
    });
  }
}
