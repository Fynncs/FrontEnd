import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComumModule } from '@fynnc/module';
import { IMessage, Message } from '@fynnc/message';
import html2canvas from 'html2canvas';
import { RelatarBugComponent } from '../relatar-bug/relatar-bug.component';

@Component({
  selector: 'app-contact-support',
  imports: [ComumModule],
  templateUrl: './contact-support.component.html',
  styleUrl: './contact-support.component.scss'
})
export class ContactSupportComponent {
  imagemBase64: string | null = null;
  constructor(private dialog: MatDialog) { }

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
      this.imagemBase64 = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = this.imagemBase64;
      link.download = 'screenshot.png';
      //document.body.appendChild(link);
      //link.click();
      //document.body.removeChild(link);
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
    const data = new Message({
      state: 'NEW',
      image: this.imagemBase64
    } as IMessage)
    this.dialog.open(RelatarBugComponent, {
      width: '4000px',
      data: data
    });
  }
}
