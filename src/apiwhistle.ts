

export const fetchWhistleblowerData = async (pin: string, pass: string) => {
    const API_URL = `https://whistleblower.inet.co.th/api/v1/whistleblower/follow`;
    try {
        const response = await fetch(`${API_URL}?pin=${pin}&pass=${pass}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
};


// apiwhistle.ts
export const postWhistleblowerComplaint = async (data: {
    pin: string;
    pass: string;
    name: string;
    mobile: string;
    email: string;
    address: string;
    complaint: string;
}) => {
    const API_URL = `https://whistleblower.inet.co.th/api/v1/whistleblower/problems`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // แปลงข้อมูลเป็น JSON
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};


export const postWhistleblowerUsage = async (data: {
    name: string;
    email: string;
    complaint: string;
}) => {
    const API_URL = `https://whistleblower.inet.co.th/api/v1/whistleblower/usage`; // แทนที่ {{UAT_W}} ด้วย URL ที่ถูกต้อง

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // แปลงข้อมูลเป็น JSON
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};




