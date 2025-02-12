// ربط حساب الديسكورد
document.getElementById('discordLink').addEventListener('click', () => {
    const CLIENT_ID = 'YOUR_CLIENT_ID';
    const REDIRECT_URI = encodeURIComponent('http://localhost:3000/callback');
    window.location.href = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20email`;
});

// معالجة طلبات الشراء
document.querySelectorAll('.orderBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
        if (!localStorage.getItem('discordToken')) {
            alert('❗ يرجى ربط حساب الديسكورد أولاً');
            return;
        }
        
        const productData = {
            id: btn.dataset.product,
            name: btn.parentElement.querySelector('h3').textContent
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('discordToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
            
            const result = await response.json();
            if (result.success) alert(`✅ تم إرسال طلبك (#${result.orderId})`);
        } catch (error) {
            console.error('Error:', error);
        }
    });
});