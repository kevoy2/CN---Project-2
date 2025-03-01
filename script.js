document.addEventListener('DOMContentLoaded', function() {
    var n;
    var y=0;
    var calcButton=document.getElementById('calc');
    calcButton.addEventListener('click', () => {
        retr();
    });
    function retr(){
        n=document.getElementById('di').value;
        y=calc(n);
        disp();
        save();
    }
    function disp(){
        var one=document.getElementById('n');
        one.innerHTML=n;
        var two=document.getElementById('answer');
        two.innerHTML=y;
    }
    function calc(x){
        if(x<=0){
            return 0;
        }else if(x==1){
            return 1;
        }else{
            return calc(x-1)+calc(x-2);
        }
    }
    async function save() {
        try {
            n=DOMPurify.sanitize(n);
            y=DOMPurify.sanitize(y);
            const response = await fetch('http://localhost:3000/save-calculation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    x: n,
                    y: y
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save calculation');
            }

            const data = await response.json();
            console.log('Saved to calculations:', data); 
        } catch (error) {
            console.error('Error saving calculation:', error);
            alert('Error saving to calculations');
        }
    }
});