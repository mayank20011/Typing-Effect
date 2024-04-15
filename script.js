class TypeWriter {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordindex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type();
  }

  type()
  {
    // current index of word
    const current= this.wordindex % this.words.length;
    // get full text of current word
    const fulltxt=this.words[current];
    
    // check if deleting

    if(this.isDeleting)
    {
      this.txt=fulltxt.substring(0 ,this.txt.length-1);
    }
    else
    {
      this.txt=fulltxt.substring(0, this.txt.length+1);
    }

    // insert txt into element

    this.txtElement.innerHTML=`<span class="txt">${this.txt}</span>`
    
    //  changing typespeed

    let typespeed= 300;
    if(this.isDeleting)
    {
      typespeed /=2;
    }

    // if word is complete
    if(!this.isDeleting && this.txt==fulltxt)
    {
      // will make a pause at the end
      typespeed=this.wait;
      this.isDeleting=true;
    }
    else if(this.isDeleting && this.txt=='')
    {
      this.isDeleting=false;
      // move to next word
      this.wordindex++;
      // pause before typing
      typespeed=500;
    }

    setTimeout(()=>{
      this.type();
    },typespeed)
  }

}


// init function will be initialized on DOM load
document.addEventListener("DOMContentLoaded",init);

function init()
{
  // getting span tags and its attribute
  const txtElement=document.querySelector('.txt-type');
  const words=JSON.parse(txtElement.getAttribute('data-words'));
  const wait= txtElement.getAttribute('data-wait');

  // Init Typewriter
  const obj=new TypeWriter(txtElement , words , wait);
}