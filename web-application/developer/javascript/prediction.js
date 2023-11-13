const countries = [
    'United States of America', 
    'Philippines',
    'United Kingdom of Great Britain and Northern Ireland', 
    'Finland',
    'India', 
    'Australia', 
    'Netherlands', 
    'Germany', 
    'Sweden', 
    'France',
    'Albania', 
    'Nigeria', 
    'Spain', 
    'South Africa', 
    'Belgium', 
    'Italy',
    'Brazil',
    'Portugal', 
    'Bangladesh', 
    'Canada', 
    'Argentina',
    'Switzerland', 
    'Sri Lanka', 
    'Poland', 
    'Lebanon', 
    'Lithuania',
    'Serbia', 
    'Cyprus', 
    'China', 
    'Bahrain',
    'Iran, Islamic Republic of Iran', 
    'Pakistan', 
    'Egypt',
    'Russian Federation', 
    'Turkey', 'Slovakia', 
    'Latvia', 
    'Greece',
    'Austria', 
    'Denmark', 
    'Israel', 
    'Norway', 
    'Hungary', 
    'Singapore',
    'United Arab Emirates', 
    'Croatia', 
    'Czech Republic', 
    'Kosovo',
    'Nepal', 
    'Slovenia', 
    'Romania', 
    'Luxembourg', 
    'Indonesia',
    'Tunisia', 
    'Republic of Korea', 
    'Viet Nam', 
    'Ukraine', 
    'Kenya',
    'Nomadic', 
    'Dominican Republic', 
    'Morocco', 
    'Uzbekistan',
    'Belarus', 
    'Isle of Man', 
    'Estonia', 
    'Bulgaria',
    'The former Yugoslav Republic of Macedonia', 
    'Georgia', 
    'Ireland',
    'Benin', 
    'Qatar', 
    'Japan', 
    'Venezuela, Bolivarian Republic of Venezuela Member',
    'Tajikistan', 
    'Malta', 
    'Colombia', 
    'Bhutan', 
    'Taiwan', 
    'Armenia',
    'Oman', 
    'El Salvador', 
    'Cuba', 
    'Cambodia', 
    'Montenegro',
    'Malaysia', 
    'Bosnia and Herzegovina', 
    'Zimbabwe', 
    'South Korea',
    'Saudi Arabia', 
    'Thailand', 
    'Hong Kong (S.A.R.)', 
    'Peru',
    'Azerbaijan', 
    'Afghanistan', 
    'Djibouti', 
    'Ethiopia', 
    'Paraguay',
    'New Zealand', 
    'Panama', 
    'Zambia', 
    'Nicaragua', 
    'Mauritius',
    'Uruguay', 
    'Congo, Republic of the Congo', 
    'Kyrgyzstan', 
    'Ghana',
    'Andorra', 
    'Kazakhstan', 
    'Jordan', 
    'Iceland',
    'Saint Vincent and the Grenadines', 
    'Trinidad and Tobago',
    'Ecuador', 
    'Uganda', 
    'Mexico', 
    'Republic of Moldova', 
    'Guatemala',
    'Mongolia', 
    'Chile', 
    'United Republic of Tanzania', 
    'Myanmar',
    'Algeria', 
    'Bolivia', 
    'Belize', 
    'Swaziland',
    'Syrian Arab Republic', 
    'Somalia', 
    'Jamaica', 
    "Côte d'Ivoire",
    'Costa Rica', 
    'Honduras', 
    'Yemen', 
    'Iraq', 
    'Palestine', 
    'Senegal',
    "Lao People's Democratic Republic", 
    'Rwanda', 
    'Malawi',
    'Sierra Leone', 
    'Guinea', 
    'Fiji', 
    'North Korea', 
    'Maldives',
    'Barbados', 
    'Kuwait', 
    'Brunei Darussalam', 
    'Palau', 
    'Angola',
    'Turkmenistan', 
    'Libyan Arab Jamahiriya', 
    'Madagascar', 
    'Lesotho',
    'Cameroon', 
    'Mozambique', 
    'Gabon', 
    'Niger',
    'Democratic Republic of the Congo', 
    'Mali', 
    'Burkina Faso',
    'Guinea-Bissau', 
    'Botswana', 
    'Liberia', 
    'Mauritania',
    'Timor-Leste', 
    'Antigua and Barbuda', 
    'Grenada', 
    'Togo',
    "Democratic People's Republic of Korea", 
    'Dominica', 
    'Guyana',
    'Namibia', 
    'Haiti', 
    'Sudan', 
    'Saint Lucia', 
    'Monaco', 
    'Bahamas',
    'Liechtenstein', 
    'Burundi', 
    'Saint Kitts and Nevis',
    'Marshall Islands', 
    'Samoa', 
    'Suriname',
    'Central African Republic', 
    'Cape Verde', 
    'San Marino'
];

const countryInput = document.getElementById('inputCountry');
const countriesList = document.getElementById('countriesList');

countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    countriesList.appendChild(option);
});

countryInput.addEventListener('input', (event) => {
    const inputValue = event.target.value.toLowerCase();
    const option = countriesList.getElementsByTagName('option');

    for (let i = 0; i < option.length; i++) {
        const optionValue = option[i].value.toLowerCase();

        if (optionValue.indexOf(inputValue) > -1) {
            option[i].style.display = '';
        } else {
            option[i].style.display = 'none';
        }
    }
});


const developers = [
    'Senior Executive (C-Suite, VP, etc.)',
    'Developer, back-end',
    'Developer, front-end', 
    'Developer, full-stack',
    'System administrator',
    'Developer, desktop or enterprise applications',
    'Developer, QA or test', 
    'Designer',
    'Data scientist or machine learning specialist',
    'Data or business analyst', 
    'Security professional', 
    'Educator',
    'Research & Development role', 
    'Developer, mobile', 'Database administrator',
    'Developer, embedded applications or devices', 
    'Student',
    'Engineer, data', 
    'Hardware Engineer', 
    'Product manager',
    'Academic researcher', 
    'Developer, game or graphics',
    'Cloud infrastructure engineer', 
    'Engineering manager',
    'Developer Experience', 
    'Project manager', 
    'DevOps specialist',
    'Engineer, site reliability', 
    'Blockchain', 
    'Developer Advocate',
    'Scientist', 
    'Marketing or sales professional',
    'Other (please specify):'
];

const developerInput = document.getElementById('inputDeveloper');
const developerList = document.getElementById('developersList');

developers.forEach(developer => {
    const option = document.createElement('option');
    option.value = developer;
    developerList.appendChild(option);
});

developerInput.addEventListener('input', (event) => {
    const inputValue = event.target.value.toLowerCase();
    const option = developerList.getElementsByTagName('option');

    for (let i = 0; i < option.length; i++) {
        const optionValue = option[i].value.toLowerCase();

        if (optionValue.indexOf(inputValue) > -1) {
            option[i].style.display = '';
        } else {
            option[i].style.display = 'none';
        }
    }
});


const languages = [
    'HTML CSS',
    'JavaScript',
    'Python',
    'Bash Shell',
    'Go',
    'PHP',
    'Ruby',
    'SQL',
    'TypeScript',
    'Ada',
    'Clojure',
    'Elixir',
    'Java',
    'Lisp',
    'OCaml',
    'Raku',
    'Scala',
    'Swift',
    'Zig',
    'Rust',
    'C#',
    'PowerShell',
    'C++',
    'Kotlin',
    'Solidity',
    'C',
    'Perl',
    'Dart',
    'Haskell',
    'Assembly',
    'Delphi',
    'R',
    'Lua',
    'MATLAB',
    'VBA',
    'Visual Basic (.Net)',
    'Julia',
    'F#',
    'Groovy',
    'APL',
    'Objective-C',
    'GDScript',
    'Crystal',
    'Cobol',
    'Fortran',
    'Prolog',
    'Erlang',
    'Apex',
    'SAS',
    'Nim',
    'Flow'
];

const languageInput = document.getElementById('inputLanguage');
const languagesList = document.getElementById('languagesList');

languages.forEach(language => {
    const option = document.createElement('option');
    option.value = language;
    languagesList.appendChild(option);
});

languageInput.addEventListener('input', (event) => {
    const inputValue = event.target.value.toLowerCase();
    const option = languagesList.getElementsByTagName('option');

    for (let i = 0; i < option.length; i++) {
        const optionValue = option[i].value.toLowerCase();

        if (optionValue.indexOf(inputValue) > -1) {
            option[i].style.display = '';
        } else {
            option[i].style.display = 'none';
        }
    }
});

const databases = [
    "Supabase",
    "PostgreSQL",
    "Redis",
    "BigQuery",
    "Elasticsearch",
    "MongoDB",
    "Cloud Firestore",
    "MariaDB",
    "Microsoft SQL Server",
    "MySQL",
    "SQLite",
    "Dynamodb",
    "Cosmos DB",
    "Cassandra",
    "H2",
    "Oracle",
    "Datomic",
    "InfluxDB",
    "Firebase Realtime Database",
    "Microsoft Access",
    "Firebird",
    "IBM DB2",
    "Solr",
    "Cockroachdb",
    "Snowflake",
    "Couch DB",
    "RavenDB",
    "Neo4J",
    "Clickhouse",
    "DuckDB",
    "TiDB",
    "Couchbase"
];

const databaseInput = document.getElementById('inputDatabase');
const databaseList = document.getElementById('databasesList');

databases.forEach(database => {
    const option = document.createElement('option');
    option.value = database;
    databaseList.appendChild(option);
});

databaseInput.addEventListener('input', (event) => {
    const inputValue = event.target.value.toLowerCase();
    const option = databaseList.getElementsByTagName('option');

    for (let i = 0; i < option.length; i++) {
        const optionValue = option[i].value.toLowerCase();

        if (optionValue.indexOf(inputValue) > -1) {
            option[i].style.display = '';
        } else {
            option[i].style.display = 'none';
        }
    }
});

const webframeworks = [
    "Next.js",
    "React",
    "Remix",
    "Vue.js",
    "Node.js",
    "Ruby on Rails",
    "WordPress",
    "Express",
    "Gatsby",
    "NestJS",
    "Angular",
    "AngularJS",
    "jQuery",
    "Phoenix",
    "Solid.js",
    "Svelte",
    "ASP.NET CORE",
    "Flask",
    "Elm",
    "Nuxt.js",
    "Fastify",
    "Spring Boot",
    "Laravel",
    "FastAPI",
    "Symfony",
    "Django",
    "Deno",
    "ASP.NET",
    "Blazor",
    "CodeIgniter",
    "Drupal",
    "Qwik",
    "Play Framework",
    "Lit"
];
const webFrameworkInput = document.getElementById('inputWebFramework');
const webFrameworksList = document.getElementById('webFrameworksList');

webframeworks.forEach(webframework => {
    const option = document.createElement('option');
    option.value = webframework;
    webFrameworksList.appendChild(option);
});

webFrameworkInput.addEventListener('input', (event) => {
    const inputValue = event.target.value.toLowerCase();
    const option = webFrameworksList.getElementsByTagName('option');

    for (let i = 0; i < option.length; i++) {
        const optionValue = option[i].value.toLowerCase();

        if (optionValue.indexOf(inputValue) > -1) {
            option[i].style.display = '';
        } else {
            option[i].style.display = 'none';
        }
    }
});

const cloudplatform = [
    "Amazon Web Services (AWS)",
    "Netlify",
    "Vercel",
    "Google Cloud",
    "OpenStack",
    "VMware",
    "Vultr",
    "Cloudflare",
    "Heroku",
    "Firebase",
    "Digital Ocean",
    "Fly.io",
    "Microsoft Azure",
    "Render",
    "Hetzner",
    "OpenShift",
    "OVH",
    "Managed Hosting",
    "Oracle Cloud Infrastructure (OCI)",
    "Linode, now Akamai",
    "Colocation",
    "Scaleway",
    "IBM Cloud Or Watson",
];
const cloudPlatformInput = document.getElementById('inputCloudPlatform');
const cloudPlatformsList = document.getElementById('cloudPlatformsList');

cloudplatform.forEach(cloudplatform => {
    const option = document.createElement('option');
    option.value = cloudplatform;
    cloudPlatformsList.appendChild(option);
});

cloudPlatformInput.addEventListener('input', (event) => {
    const inputValue = event.target.value.toLowerCase();
    const option = cloudPlatformsList.getElementsByTagName('option');

    for (let i = 0; i < option.length; i++) {
        const optionValue = option[i].value.toLowerCase();

        if (optionValue.indexOf(inputValue) > -1) {
            option[i].style.display = '';
        } else {
            option[i].style.display = 'none';
        }
    }
});

// Log input data to the web console when the form is submitted
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const goPredictionBtn = document.getElementById('goPredictionBtn');

    goPredictionBtn.addEventListener('click', event => {
        event.preventDefault();

        const codeYears = document.getElementById('codeYears').value;
        const codeYearsPro = document.getElementById('codeYearsPro').value;
        const edl = document.getElementById('edl').value;
        const inputLearn = document.getElementById('inputLearn').value;
        const inputCountry = document.getElementById('inputCountry').value;
        const inputDeveloper = document.getElementById('inputDeveloper').value;
        const inputAge = document.getElementById('inputAge').value;
        const inputLanguage = document.getElementById('inputLanguage').value;
        const inputDatabase = document.getElementById('inputDatabase').value;
        const inputWebFramework = document.getElementById('inputWebFramework').value;
        const inputCloudPlatform = document.getElementById('inputCloudPlatform').value;

        console.log('Years of coding experience:', codeYears);
        console.log('Years of professional experience:', codeYearsPro);
        console.log('Education Level:', edl);
        console.log('Learning Source:', inputLearn);
        console.log('Country:', inputCountry);
        console.log('Developer Type:', inputDeveloper);
        console.log('Age:', inputAge);
        console.log('Programming Language:', inputLanguage);
        console.log('Database:', inputDatabase);
        console.log('Web Framework:', inputWebFramework);
        console.log('Cloud Platform:', inputCloudPlatform);

        // You can add further processing or send the data to a server here
        // Reset the form if needed
        form.reset();
    });
});
