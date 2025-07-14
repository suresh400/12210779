const BASE_URL = 'http://20.244.56.144/evaluation-service';

let credentials = {
  name: 'Your Name',
  rollNo: 'YourRollNo',
  mobileNo: 'YourMobileNo',
  githubUsername: 'yourGithubUsername',
  accessCode: 'YourAccessCode',
};

let authData = {
  clientID: '',
  clientSecret: '',
  token: '',
};
export const registerClient = async () => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    console.log('Registered:', data);

    authData.clientID = data.clientID;
    authData.clientSecret = data.clientSecret;

    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const authenticateClient = async () => {
  try {
    const payload = {
      name: credentials.name,
      rollno: credentials.rollNo,
      accesscode: credentials.accessCode,
      clientID: authData.clientID,
      clientSecret: authData.clientSecret,
    };

    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    authData.token = data.accessToken;
    console.log('Authenticated. Token:', data.accessToken);
    return data;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};

export const sendLog = async ({ stack = 'info', level = 'info', message = '', packageName = 'url-shortener' }) => {
  try {
    const payload = {
      stack,
      level,
      package: packageName,
      message,
    };

    const response = await fetch(`${BASE_URL}/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Log sent successfully:', data);
    } else {
      console.warn('Failed to log:', data);
    }

    return data;
  } catch (error) {
    console.error('Error sending log:', error);
  }
};
