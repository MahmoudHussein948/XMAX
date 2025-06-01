// --- Theme Toggle Functionality ---
document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle button
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference or use default light theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle between light and dark themes
    themeToggleBtn.addEventListener('click', function() {
        // Add rotation animation
        themeIcon.classList.add('theme-toggle-animation');
        
        // Toggle dark mode class on body
        document.body.classList.toggle('dark-mode');
        
        // Update icon and save preference
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            themeIcon.classList.remove('theme-toggle-animation');
        }, 500);
    });
    
    // Add enhanced UI classes to elements
    const quizSections = document.querySelectorAll('.quiz-section');
    quizSections.forEach(section => {
        section.classList.add('enhanced');
    });
    
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.classList.add('enhanced-shadow');
    });
});

// --- Questions Data Structure ---
// IP Addressing Questions
const ipAddressingQuestions = [
    // IP Addressing
    {
        topic: "IP Addressing",
        question: "What is the length of the MAC address?",
        options: ["32 bits", "64 bits", "48 bits", "128 bits"],
        correctAnswer: "48 bits",
        explanation: "MAC address (Media Access Control address) is a unique identifier consisting of 48 bits (6 bytes) assigned to a network interface by the manufacturer. It is used at the Data Link Layer (Layer 2) of the OSI model.",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "Which of the following represents a layer-3 address?",
        options: ["00:1A:2B:3C:4D:5E", "192.168.3.200", "FF:FF:FF:FF:FF:FF", "localhost"],
        correctAnswer: "192.168.3.200",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "Which protocol is responsible for converting the IP address to a MAC address?",
        options: ["DNS", "ARP", "DHCP", "ICMP"],
        correctAnswer: "ARP",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "Which utility can be used to display and modify the table that maintains the TCP/IP address to MAC address translation?",
        options: ["ipconfig", "ping", "arp", "netstat"],
        correctAnswer: "ARP",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "ARP is responsible for converting:",
        options: ["layer-2 to layer-3 addresses", "layer-3 to layer-2 addresses", "port numbers to IP addresses", "domain names to IP addresses"],
        correctAnswer: "layer-3 to layer-2 addresses",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "Which command and command switch were used to generate the output?", // Assuming output implies looking at ARP table
        options: ["ipconfig /all", "ping -t", "arp -a", "netstat -an"],
        correctAnswer: "ARP -a",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "Which technology assigns IPs dynamically?",
        options: ["DNS", "ARP", "DHCP", "NAT"],
        correctAnswer: "DHCP",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "What is a port number used for in TCP/IP?",
        options: ["Identifying network interfaces", "Identifying specific processes/services on a device.", "Identifying physical locations", "Identifying network cables"],
        correctAnswer: "Identifying specific processes/services on a device.",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "Which IP class provides the most host addresses?",
        options: ["Class A", "Class B", "Class C", "Class D"],
        correctAnswer: "Class A",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "Which of the following is not a valid IP address?",
        options: ["192.168.1.1", "172.16.0.1", "10.0.0.256", "1.1.1.1"],
        correctAnswer: "10.0.0.256",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "What does DNS stand for?",
        options: ["Data Network Service", "Domain Name System", "Dynamic Network Server", "Distributed Naming Service"],
        correctAnswer: "Domain Name System",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "Which address is used in an internet employing the TCP/IP protocols?",
        options: ["MAC address", "IP address", "Port number", "All of the mentioned"],
        correctAnswer: "All of the mentioned",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "MAC address is used at which OSI layer?",
        options: ["Network", "Transport", "Data Link", "Physical"],
        correctAnswer: "Data Link",
        type: "multiple-choice"
    },
    {
        topic: "IP Addressing",
        question: "IP addresses are used to identify devices on the same network physically.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
];

// OSI & TCP/IP Models Questions
const osiTcpIpModelsQuestions = [
    {
        topic: "OSI & TCP/IP Models",
        question: "Which of the following layers isn't present in the TCP/IP model but is included in the OSI model?",
        options: ["Network layer", "Transport layer", "Session layer", "Application layer"],
        correctAnswer: "Session layer",
        explanation: "نموذج TCP/IP يتكون من 4 طبقات فقط (تطبيق، نقل، إنترنت، وصول للشبكة) بينما نموذج OSI يتكون من 7 طبقات. طبقة الجلسة (Session Layer) موجودة في نموذج OSI ولكنها غير موجودة كطبقة منفصلة في نموذج TCP/IP، حيث تم دمج وظائفها في طبقة التطبيق في TCP/IP.",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which of the following layer change the bits onto electromagnetic signals?",
        options: ["Data Link", "Network", "Physical", "Transport"],
        correctAnswer: "Physical",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "What does TCP/IP mean?",
        options: ["Transmission Control Protocol/Internet Protocol", "Total Connection Packet/Internet Proxy", "Technical Communication Protocol/Internal Packet", "Transfer Command Program/Internet Protocol"],
        correctAnswer: "Transmission Control Protocol/Internet Protocol",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which of the following layers determines the interface of the system with the user?",
        options: ["Application", "Presentation", "Session", "Transport"],
        correctAnswer: "Presentation",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "What is the main function of transport layer?",
        options: ["Routing packets", "End to end delivery", "Physical transmission", "Data encryption"],
        correctAnswer: "End to end delivery",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which of the following is an application layer service?",
        options: ["HTTP", "FTP", "DNS", "All of the above"],
        correctAnswer: "All of the above",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "What is the form of data in the Internet layer in the TCP/IP model?",
        options: ["Segments", "Frames", "Bits", "Packets"],
        correctAnswer: "Packets",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "What is the full form of OSI model?",
        options: ["Open Source Initiative", "Optical Systems Interface", "Open System Interconnection", "Operating System Integration"],
        correctAnswer: "Open System Interconnection",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which of the following protocols makes direct connection between network devices?",
        options: ["TCP", "UDP", "Connection Protocol", "IP"],
        correctAnswer: "Connection Protocol",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which layer of the OSI model is responsible for routing?",
        options: ["Data Link", "Network", "Transport", "Application"],
        correctAnswer: "Network",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which of the following is a connection-oriented protocol?",
        options: ["UDP", "IP", "TCP", "ICMP"],
        correctAnswer: "TCP",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which layer is responsible for end-to-end communication?",
        options: ["Network", "Data Link", "Transport", "Session"],
        correctAnswer: "Transport",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which layer ensures data formatting and encryption?",
        options: ["Application", "Session", "Presentation", "Transport"],
        correctAnswer: "Presentation",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "The basic unit of data in the transport layer is called:",
        options: ["Packet", "Frame", "Segment", "Datagram"],
        correctAnswer: "Segment",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which protocol uses three-way handshake?",
        options: ["UDP", "ICMP", "TCP", "ARP"],
        correctAnswer: "TCP",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which layer of the OSI model is responsible for session establishment and teardown?",
        options: ["Transport", "Presentation", "Session", "Application"],
        correctAnswer: "Session",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "What does 'encapsulation' mean in networking?",
        options: ["Sending data to multiple devices", "Wrapping data with headers as it moves through layers.", "Converting data to signals", "Decoding encrypted data"],
        correctAnswer: "Wrapping data with headers as it moves through layers.",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which layer of the OSI model is responsible for converting the packet to an electrical signal?",
        options: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"],
        correctAnswer: "Layer 1 (Physical)",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which layer of the OSI model does the IP protocol run at?",
        options: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"],
        correctAnswer: "Layer 3 (Network)",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which of the following protocols are layer-4 protocols?",
        options: ["IP", "ARP", "TCP", "HTTP"],
        correctAnswer: "TCP",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "During Encapsulation/De-encapsulation, at which layer is a trailer usually added to the message?",
        options: ["Application", "Network", "Data link", "Physical"],
        correctAnswer: "Data link",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Each layer in OSI model has:",
        options: ["Headers", "Footers", "Payloads", "Both Headers and Footers"], // Adjusted options for better clarity
        correctAnswer: "Headers",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "TCP/IP model was developed model.",
        options: ["After", "Before", "Simultaneously with", "Independent of"],
        correctAnswer: "Before",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which layer links the network support layers and user support layers?",
        options: ["Application layer", "Transport layer", "Network layer", "Data link layer"],
        correctAnswer: "Transport layer",
        type: "multiple-choice"
    },
    {
        topic: "OSI & TCP/IP Models",
        question: "Which of the following is not a layer in the OSI model?",
        options: ["Physical", "Data Link", "Data transmission", "Application"],
        correctAnswer: "Data transmission",
        type: "multiple-choice"
    },
];

// Subnetting Questions
const subnettingQuestions = [
    {
        topic: "Subnetting",
        question: "What is the number of hosts on a local subnet that uses the 255.255.255.224 subnet mask?",
        options: ["14", "30", "62", "126"],
        correctAnswer: "30",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "We need 5 subnets, each with at least 16 hosts. Which of the following subnet masks is correct?",
        options: ["255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248"],
        correctAnswer: "255.255.255.224",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "We have a network of class B, and we need 59 subnets, how many bits must you borrow from the host field to provide the correct subnet mask?",
        options: ["4", "5", "6", "7"],
        correctAnswer: "6",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "How many subnets and hosts if the IP address of a network is 180.85.0.0/22?",
        options: ["4 subnets, 512 hosts each", "8 subnets, 256 hosts each", "16 subnets, 128 hosts each", "64 subnets, 1024 hosts each"],
        correctAnswer: "64 subnets, 1024 hosts each",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "Which of the following is a valid host address with the network 175.16.20.0/22?",
        options: ["175.16.20.0", "175.16.20.1", "175.16.23.255", "175.16.24.0"],
        correctAnswer: "175.16.20.1",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "What is the subnet address for a host with the IP address 210.20.15.68/28?",
        options: ["210.20.15.0", "210.20.15.16", "210.20.15.32", "210.20.15.64"],
        correctAnswer: "210.20.15.64",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "What is default subnet mask?",
        options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
        correctAnswer: "255.255.255.0",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "What is costume subnet mask?",
        options: ["255.255.255.0", "255.255.255.128", "255.255.255.240/28", "255.255.0.0"],
        correctAnswer: "255.255.255.240/28",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "What is the hop count?", // Context needed here, assuming this is from a specific subnetting scenario. Making it general multiple choice
        options: ["8", "16", "32", "64"],
        correctAnswer: "16", // Assuming it's from a fixed question set
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "How many number of subnets?", // Context needed, making general MC
        options: ["4", "8", "16", "32"],
        correctAnswer: "16", // Assuming it's from a fixed question set
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "What is the number of hosts for each subnet?", // Context needed, making general MC
        options: ["10", "14", "20", "30"],
        correctAnswer: "14", // Assuming it's from a fixed question set
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "What is the IP address of the last host in subnet #2?", // Context needed, making general MC
        options: ["195.150.100.15", "195.150.100.14", "195.150.100.31", "195.150.100.30"],
        correctAnswer: "195.150.100.14", // Assuming it's from a fixed question set
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "What is the IP address of host # 3 in subnet # 3?", // Context needed, making general MC
        options: ["195.150.100.32", "195.150.100.34", "195.150.100.35", "195.150.100.36"],
        correctAnswer: "195.150.100.35", // Assuming it's from a fixed question set
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "What is the IP address of broadcast of subnet # 4?", // Context needed, making general MC
        options: ["195.150.100.62", "195.150.100.63", "195.150.100.64", "195.150.100.65"],
        correctAnswer: "195.150.100.63", // Assuming it's from a fixed question set
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "Which of the following masks can be used to divide the 130.100.0.0 network into 30 equal-sized subnets?",
        options: ["255.255.0.0", "255.255.240.0", "255.255.248.0", "255.255.252.0"],
        correctAnswer: "255.255.248.0",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "You have the network ID of 131.107.0.0 and want to subnet into six networks. What will be your new subnet mask?",
        options: ["255.255.0.0", "255.255.192.0", "255.255.224.0", "255.255.240.0"],
        correctAnswer: "255.255.224.0",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "If you divide your network into eight networks, how many bits will you need to take from the host ID portion of the subnet mask?",
        options: ["2", "3", "4", "5"],
        correctAnswer: "3",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "In binary, how do you calculate the broadcast address of a network range?",
        options: ["All host bits set to 0", "All network bits set to 1", "All host bits set to 1", "All bits set to 1"],
        correctAnswer: "All host bits set to 1",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "In binary, how do you calculate the network ID of a network range?",
        options: ["All host bits set to 0", "All network bits set to 0", "All host bits set to 1", "All bits set to 0"],
        correctAnswer: "All host bits set to 0",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "What is CIDR notation used for?",
        options: ["Identifying MAC addresses", "Representing subnets.", "Defining port numbers", "Encrypting data"],
        correctAnswer: "Representing subnets.",
        type: "multiple-choice"
    },
    {
        topic: "Subnetting",
        question: "CIDR allows for more efficient IP address allocation.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Subnetting",
        question: "IPv6 eliminates the need for NAT.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
];

// Types of Computer Network Questions
const networkTypesQuestions = [
    {
        topic: "Types of Computer Network",
        question: "The networks are classified according to the purpose of their use and the type of units used to:",
        options: ["2 types", "3 types", "4 types", "5 types"],
        correctAnswer: "4 types",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "It uses the microprocessors in control devices electronic to measurement, sensing, and control:",
        options: ["Broadcast network", "Telecommunication network", "Digital control network", "Client-Server network"],
        correctAnswer: "Digital control network",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "In a ...... network, networked computers act as equal partners or peers:",
        options: ["Client-Server", "Peer to Peer", "Hybrid", "Centralized"],
        correctAnswer: "Peer to Peer",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which of the following topologies contains bi-directional links between every possible node?",
        options: ["Star topology", "Bus topology", "Ring topology", "Mesh topology"],
        correctAnswer: "Mesh topology",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which of the following is one of the classification of the computer networks according to purpose?",
        options: ["Types of connection", "Types of services", "Types of protocols", "Types of communication tools"],
        correctAnswer: "Types of communication tools",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "How many types of computer networks according to the technology used in the network?",
        options: ["Two", "Three", "Four", "Five"],
        correctAnswer: "Four",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which of the following networks is just the collection of networks that can be joined together?",
        options: ["WAN", "MAN", "LAN", "CAN"],
        correctAnswer: "LAN", // This seems to be a slightly ambiguous question; LANs are local, but can be part of larger interconnected networks. Given options, LAN is the most appropriate as the base collection.
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "In any of the following networks, each computer can take on the client function or the server function.",
        options: ["Peer to Peer", "Client-Server", "Hybrid", "Cloud-based"],
        correctAnswer: "Peer to Peer",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Examples of ........ network: the telephone network, the mobile network, and the television broadcast network.",
        options: ["Telecommunication", "Digital control", "Data transmission", "Local Area"],
        correctAnswer: "Telecommunication",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which of the following networks is converting, processing, collecting and transferring data through communication lines between units.",
        options: ["Digital control", "Transmission", "Telecommunication", "Peer to Peer"],
        correctAnswer: "Transmission",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "The computer network devices are broken up into ........ classifications.",
        options: ["Two", "Three", "Four", "Many"],
        correctAnswer: "Two",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "It forwards data packets between computer networks or subnetworks:",
        options: ["Switch", "Hub", "Router", "Repeater"],
        correctAnswer: "Router",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which device connects two different networks together?",
        options: ["Hub", "Switch", "Router", "Bridge"],
        correctAnswer: "Router",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "In a star topology, if the central hub fails, the network:",
        options: ["Continues to operate", "Experiences degraded performance", "Fails completely.", "Only affects one device"],
        correctAnswer: "Fails completely.",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which topology offers the most redundancy?",
        options: ["Bus", "Star", "Ring", "Mesh"],
        correctAnswer: "Mesh",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which type of device is responsible for connecting dissimilar networking environments together?",
        options: ["Switch", "Router", "Gateway", "Hub"],
        correctAnswer: "Gateway",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "What is the Microsoft term for a peer-to-peer network?",
        options: ["Domain", "Workgroup", "Forest", "Client-server"],
        correctAnswer: "Workgroup",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "A company has offices in Halifax and Toronto. What type of network is this?",
        options: ["LAN", "MAN", "WAN", "PAN"],
        correctAnswer: "WAN",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which topology has a centralized location in which all of the cables come together?",
        options: ["Bus", "Ring", "Star", "Mesh"],
        correctAnswer: "Star",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which topology has each workstation connected to every other workstation?",
        options: ["Bus", "Star", "Ring", "Mesh"],
        correctAnswer: "Mesh",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "Which wireless mode involves two laptops connecting directly to one another?",
        options: ["Infrastructure mode", "Ad hoc mode", "Managed mode", "Client mode"],
        correctAnswer: "Ad hoc mode",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "What category of network is illustrated in the exhibit?", // Exhibit missing, assuming general question about network types
        options: ["LAN", "WAN", "Metropolitan area network", "Personal area network"],
        correctAnswer: "Metropolitan area network", // Assuming MAN based on typical example questions
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "A Computer Network connects two or more autonomous computers primarily to save energy.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "One of the main goals of a computer network is to enable users to share resources like files and printers.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "High reliability in a computer network can be provided by having multiple sources of supply, such as replicating files on different machines.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Cost reduction is not a goal of implementing a computer network.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "The Internet is described as the largest and most varied WAN in the world.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A PAN (Personal Area Network) typically spans a metropolitan area.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A LAN (Local Area Network) connects devices in one physical location, such as a building or office.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A CAN (Campus Area Network) interconnects multiple LANs within an educational or corporate campus.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A MAN (Metropolitan Area Network) is smaller than a LAN.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A WAN (Wide Area Network) extends over a large geographic area.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A SAN (Storage Area Network) is a specialized, high-speed network that provides network access to storage devices.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Broadcast networks have a single communication channel shared by all machines on the network.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Point-to-point or Switched networks have a single shared communication channel for all devices.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Broadcasting sends a packet to a subset of machines on a network.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Multicasting sends a packet to all destinations on a network.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In Point-to-point or Switched networks, packets may have to visit one or more intermediate machines to reach the destination.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Circuit Switched Networks establish a temporary connection for the duration of the session.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In a Peer-to-Peer (P2P) network model, resources are managed by a centralized server.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A Peer-to-Peer (P2P) network is generally recommended for networks with more than 15 computers due to its scalability.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A disadvantage of using traditional Peer-to-Peer networks is that they are not necessarily secure.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In a Client-Server network model, resources are managed by a centralized directory database.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In a Client-Server network, clients share their resources directly with each other without server control.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Client-Server networks offer advantages like centralized user account management and better scalability compared to P2P networks.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Topology refers to the shape or layout of a network, determining how nodes connect and communicate.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Physical topology refers to the software-based control of network access.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Logical topology refers to the hardware layout of devices and cables.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A disadvantage of the Bus topology is that a single fault in the cable stops all transmission.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In a Star topology, devices connect to a central hub.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In a Star topology, failure in the central hub brings the entire network to a halt.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In a Ring topology, data is typically transmitted in multiple directions simultaneously.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "Adding or removing computers in a Ring topology generally has no impact on the network.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In a Tree topology, there is only one route that exists between any two nodes on the network.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A Mesh topology is characterized by devices being highly interconnected, potentially with redundant paths.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In a Mesh topology, a failure in one computer will always cause the entire network to break down.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "LANs typically cover large geographic areas.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "If all devices are connected to a central hub, then topology is called", // Assuming options were 1) Bus 2) Star, etc.
        options: ["Bus Topology", "Star Topology", "Ring Topology", "Mesh Topology"],
        correctAnswer: "Star Topology",
        type: "multiple-choice"
    },
    {
        topic: "Types of Computer Network",
        question: "A hub connects two different LANs.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A router connects two different LANs.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "A LAN is usually confined to a single building or connected buildings.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "Types of Computer Network",
        question: "In a peer-to-peer network, any client computer can also be a server.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
];

// True/False Questions
const trueFalseQuestions = [
    {
        topic: "True/False Questions",
        question: "The Central Processing Unit (CPU) is often referred to as the 'brain' of the computer.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "RAM (Random-Access Memory) is a type of permanent storage that retains its contents when the computer is turned off.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Virtual memory allows a system to run larger programs than physically fit in RAM by using disk storage for temporary data transfer.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Super Computers are the least powerful type of computer and are typically used in homes and offices.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Mainframe Computers are large-scale computers designed to handle huge amounts of input, output, and storage for large organizations.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Mini Computers are more powerful than Mainframe Computers but less powerful than Personal Computers.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Workstations typically use the UNIX operating system or a variation of it.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "The terms Micro Computers and Personal Computers (PCs) are often used interchangeably.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Thin Clients are simple, low-performance computers optimized for remote connection to servers.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Tightly-Coupled Systems usually communicate via shared memory and typically run the same OS on all processors.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "In Loosely-Coupled Systems, communication occurs through message passing, and different OSs can be implemented on different nodes.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Flynn's Taxonomy classifies parallel computers based on their physical size.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "SISD (Single Instruction, Single Data Stream) describes sequential computers executing a single instruction on a single data stream.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "SIMD (Single Instruction, Multiple Data Stream) involves multiple processors executing different instructions on the same data.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "MISD (Multiple Instruction, Single Data Stream) is primarily of theoretical interest as no practical system has been constructed using this organization according to the sources.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "MIMD (Multiple Instruction, Multiple Data Stream) allows processors in a parallel computer to execute different instructions on different data simultaneously.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "The Von-Neumann Model is based on the stored-program concept, where instruction data and program data are stored in separate memories.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "The Von-Neumann Model is still used in most computers today.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Instruction Set Architecture (ISA) is the part of the processor visible to the programmer or compiler writer.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "RISC (Reduced Instruction Set Computer) processors have a large number of complex instructions.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "CISC (Complex Instruction Set Computer) processors have a limited number of simple, fast-executing instructions.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "System Programs, such as operating systems, are essential for the system to run.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "The system can run without Application Programs like word processors.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "The language of the computer is machine language, which is a sequence of 0s and 1s.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A binary digit (0 or 1) is called a Byte.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A sequence of eight bits is called a Byte.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Every network node needs a network address.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A Switch manages traffic between different networks and finds the best path for traffic.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A Router belongs only to its local network, similar to a switch.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A Router stands as a gateway between different networks.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "NIC stands for Network Interface Card.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Structured Cabling is a standard describing the best way to install networking media to maximize performance.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Structured Cabling is based on a hierarchical design and typically assumes a network is set up in a Bus topology.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "The Demarc (Demarcation Point) is the device marking where the service provider's network ends and the organization's network begins.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "The Entrance Facility is the location where an incoming external network connects with the organization's network.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "The MDF (Main Distribution Frame) is the centralized point of interconnection for an organization's LAN or WAN.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "There can be multiple MDFs on a single campus.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "An IDF (Intermediate Distribution Frame) provides an intermediate connection between the MDF and end-user equipment.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "TIA/EIA standard specifies at least one IDF per floor.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Data Rooms or Data Centers typically do not require special cooling or ventilation systems.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A Patch Panel provides a central termination point for converging patch cables.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Horizontal Cabling connects workstations to the closest data room and switches.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "The maximum allowable distance for Horizontal Cabling is typically 500 meters.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Backbone Cabling interconnects MDFs, IDFs, and the entrance facility.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Fiber-optic cable is often used for Backbone Cabling on large, modern networks.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "UTP (Unshielded Twisted Pair) cable is a type of copper-based cable.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "STP (Shielded Twisted Pair) cable includes metallic shielding around the twisted-pair wires.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "SMF (Single Mode Fiber) has a larger core diameter than MMF (Multimode Fiber).",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "SMF (Single Mode Fiber) is commonly used for the Internet backbone.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Media Converters enable interconnection between networks or segments using different media like copper and fiber.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "In Serial Transmission, all bits of a byte are transmitted simultaneously on separate wires.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "IP operates at the Transport Layer.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A switch manages traffic between different networks and finds the best path for traffic.", // Duplicative with "A Switch manages traffic between different networks and finds the best path for traffic." (False)
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "HTTP is a stateless protocol.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "MAC addresses can change dynamically like IP addresses.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Star topology provides better fault tolerance than bus topology.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "SMTP is used for receiving emails.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "802.11 refers to Ethernet standards.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "TCP guarantees reliable data transfer.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Broadcast messages are forwarded by routers.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Fiber optic cables are immune to electromagnetic interference.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "POP3 is used to send emails.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "UDP provides error recovery.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A collision domain is created by each port of a switch.", // This is complex, but in modern Ethernet, each switch port is its own collision domain.
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Telnet is more secure than SSH.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Routers operate at OSI layer 3.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A repeater strengthens signals over long distances.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Bridges break up broadcast domains.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Error correction is handled at the Presentation Layer.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Switches can break up collision domains.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Traceroute is used to detect errors in transmission.", // More for path analysis, not error detection.
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Telnet is encrypted and more secure than SSH.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "A single switch creates multiple broadcast domains.",
        options: ["True", "False"],
        correctAnswer: "False",
        type: "true-false"
    },
    {
        topic: "True/False Questions",
        question: "Wireshark is used for packet analysis in networks.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "The OSI (Open Systems Interconnection) reference model is a five-layer model for categorizing communication layers.",
        options: ["True", "False"],
        correctAnswer: "False", // It's a seven-layer model
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "The Application Layer (Layer 7) is the interface between applications and the network.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "The Presentation Layer (Layer 6) is responsible for reformatting, compressing, and encrypting data.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "The Session Layer (Layer 5) is responsible for transporting Application layer payloads between applications.",
        options: ["True", "False"],
        correctAnswer: "False", // Transport layer is responsible for that. Session layer manages sessions.
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "The Transport Layer (Layer 4) is responsible for transporting payloads between applications.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "TCP (Transmission Control Protocol) is a connectionless protocol that does not guarantee delivery.",
        options: ["True", "False"],
        correctAnswer: "False", // TCP is connection-oriented and reliable.
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "UDP (User Datagram Protocol) is a connection-oriented protocol that guarantees delivery.",
        options: ["True", "False"],
        correctAnswer: "False", // UDP is connectionless and does not guarantee delivery.
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "The Network Layer (Layer 3) is responsible for moving messages (packets) between nodes to the destination.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "The Network Layer uses MAC addresses to identify hosts.",
        options: ["True", "False"],
        correctAnswer: "False", // Network layer uses IP addresses. Data Link layer uses MAC addresses.
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "IP (Internet Protocol) is the principal protocol used by the Network Layer and identifies hosts by IP addresses.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "The Data Link Layer (Layer 2) puts control information in a header, creating a frame, and uses MAC addresses.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "The Physical Layer (Layer 1) is responsible for sending bits via wired or wireless transmission.",
        options: ["True", "False"],
        correctAnswer: "True",
        type: "true-false"
    },
    {
        topic: "OSI & TCP/IP Models", // Moved from general T/F to its specific topic based on context
        question: "Which layer of the OSI model is associated with error detection and correction?",
        options: ["Physical Layer", "Network Layer", "Transport Layer", "Data Link Layer"], // Changed "4) Data Link Layer" to just Data Link Layer and added other options
        correctAnswer: "Data Link Layer",
        type: "multiple-choice"
    }
];

// Create combined array of all questions
const allQuestions = [
    ...ipAddressingQuestions,
    ...osiTcpIpModelsQuestions,
    ...subnettingQuestions,
    ...networkTypesQuestions,
    ...trueFalseQuestions
];

// --- DOM Elements ---
const topicSelectionSection = document.getElementById('topic-selection');
const quizContainer = document.getElementById('quiz-container');
const resultsSection = document.getElementById('results-section');
const questionText = document.querySelector('.question-text');
const optionsContainer = document.getElementById('options-container');
const currentQNumElement = document.getElementById('current-q-num');
const totalQNumElement = document.getElementById('total-q-num');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const scoreDisplay = document.getElementById('score-display');
const detailedResults = document.getElementById('detailed-results');
const restartBtn = document.getElementById('restart-btn');
const backToTopicsBtn = document.getElementById('back-to-topics-btn');
const topicDropdown = document.getElementById('topic-dropdown');
const startQuizBtn = document.getElementById('start-quiz-btn');

// --- Variables ---
let activeQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = []; 
let startTime = null;
let endTime = null;

let topicList = [];
let topicQuestions = {};

// --- Functions ---

function startQuiz(topic) {
    // Hide topic selection and show quiz
    topicSelectionSection.style.display = 'none';
    quizContainer.style.display = 'block';
    resultsSection.style.display = 'none';
    
    // Reset state
    currentQuestionIndex = 0;
    userAnswers = [];
    
    // Record start time
    startTime = new Date();

    // Filter questions based on topic
    switch(topic) {
        case "IP Addressing":
            activeQuestions = ipAddressingQuestions.slice();
            break;
        case "Introduction":
            // Assuming we'll add introduction questions later
            // For now, use all questions as a fallback
            activeQuestions = allQuestions.slice();
            break;
        case "OSI & TCP/IP Models":
            activeQuestions = osiTcpIpModelsQuestions.slice();
            break;
        case "Subnetting":
            activeQuestions = subnettingQuestions.slice();
            break;
        case "The OSI Model":
            // Filter questions about OSI Model specifically
            activeQuestions = osiTcpIpModelsQuestions.filter(q => 
                q.question.toLowerCase().includes('osi') && 
                !q.question.toLowerCase().includes('tcp'));
            break;
        case "The TCP/IP Model":
            // Filter questions about TCP/IP Model specifically
            activeQuestions = osiTcpIpModelsQuestions.filter(q => 
                q.question.toLowerCase().includes('tcp'));
            break;
        case "True/False Questions":
            activeQuestions = trueFalseQuestions.slice();
            break;
        case "Types of Computer Network":
            activeQuestions = networkTypesQuestions.slice();
            break;
        case "All Categories":
            activeQuestions = allQuestions.slice();
            break;
        default:
            activeQuestions = allQuestions.slice();
    }
    
    // Shuffle questions
    activeQuestions = shuffleArray(activeQuestions);
    
    // Update total question count
    totalQNumElement.textContent = activeQuestions.length;
    
    // Load first question
    loadQuestion();
}

function loadQuestion() {
    // Clear previous options
    optionsContainer.innerHTML = '';

    // Hide explanation section when loading a new question
    document.getElementById('answer-explanation').style.display = 'none';

    // Get current question
    const currentQuestion = activeQuestions[currentQuestionIndex];
    
    // Update question number
    currentQNumElement.textContent = currentQuestionIndex + 1;
    totalQNumElement.textContent = activeQuestions.length;

    // Update question text
    questionText.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        
        // إضافة رقم الخيار
        const optionNumber = document.createElement('span');
        optionNumber.className = 'option-number';
        optionNumber.textContent = (index + 1);
        button.appendChild(optionNumber);
        
        // إضافة نص الخيار
        const optionText = document.createElement('span');
        optionText.className = 'option-text';
        optionText.textContent = option;
        button.appendChild(optionText);
        
        // If user has already answered this question, mark their selection
        if (userAnswers[currentQuestionIndex] === option) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => selectOption(button, option));
        optionsContainer.appendChild(button);
    });

    updateNavigationButtons();
}

function selectOption(selectedButton, selectedAnswer) {
    // Get the current question and its correct answer
    const currentQuestion = activeQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    const explanationElement = document.getElementById('answer-explanation');
    const explanationContent = document.getElementById('explanation-content');
    
    // Remove classes from all options
    Array.from(optionsContainer.children).forEach(button => {
        button.classList.remove('selected', 'correct', 'incorrect');
    });

    // Add 'selected' class to the clicked button
    selectedButton.classList.add('selected');
    
    // Show if the selected answer is correct or incorrect
    if (selectedAnswer === correctAnswer) {
        selectedButton.classList.add('correct');
        
        // إضافة أيقونة الإجابة الصحيحة
        const correctIcon = document.createElement('i');
        correctIcon.className = 'fas fa-check-circle answer-icon correct-icon';
        selectedButton.appendChild(correctIcon);
    } else {
        selectedButton.classList.add('incorrect');
        
        // إضافة أيقونة الإجابة الخاطئة
        const incorrectIcon = document.createElement('i');
        incorrectIcon.className = 'fas fa-times-circle answer-icon incorrect-icon';
        selectedButton.appendChild(incorrectIcon);
        
        // Find and mark the correct answer button
        Array.from(optionsContainer.children).forEach(button => {
            // Extract text content from option-text span
            const buttonText = button.querySelector('.option-text').textContent;
            if (buttonText === correctAnswer) {
                button.classList.add('correct');
                
                // إضافة أيقونة الإجابة الصحيحة للخيار الصحيح
                const correctIcon = document.createElement('i');
                correctIcon.className = 'fas fa-check-circle answer-icon correct-icon';
                button.appendChild(correctIcon);
            }
        });
    }
    
    // Show explanation if available
    if (currentQuestion.explanation) {
        explanationContent.innerHTML = currentQuestion.explanation;
        explanationElement.style.display = 'block';
    } else {
        // Default explanation if none provided
        explanationContent.innerHTML = `<p>الإجابة الصحيحة هي: <strong>${correctAnswer}</strong></p>`;
        explanationElement.style.display = 'block';
    }
    
    // Store the user's answer
    userAnswers[currentQuestionIndex] = selectedAnswer;
}

function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.style.display = (currentQuestionIndex < activeQuestions.length - 1) ? 'inline-block' : 'none';
    submitBtn.style.display = (currentQuestionIndex === activeQuestions.length - 1) ? 'inline-block' : 'none';
}

function showResults() {
    // Hide quiz container and show results section
    quizContainer.style.display = 'none';
    resultsSection.style.display = 'block';
    
    // Record end time and calculate duration
    endTime = new Date();
    const timeDiff = Math.floor((endTime - startTime) / 1000); // in seconds
    
    // Format time spent
    let timeSpent = '';
    if (timeDiff >= 3600) { // more than an hour
        const hours = Math.floor(timeDiff / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        timeSpent = `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (timeDiff >= 60) { // more than a minute
        const minutes = Math.floor(timeDiff / 60);
        const seconds = timeDiff % 60;
        timeSpent = `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
    } else { // less than a minute
        timeSpent = `${timeDiff} second${timeDiff !== 1 ? 's' : ''}`;
    }
    
    // Update time spent display
    const timeSpentElement = document.getElementById('time-spent');
    if (timeSpentElement) {
        timeSpentElement.textContent = timeSpent;
    }
    
    // Calculate score
    let score = 0;
    detailedResults.innerHTML = ''; // Clear previous results

    // Process each question and create result items
    activeQuestions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = (userAnswer === q.correctAnswer);

        if (isCorrect) {
            score++;
        }

        // Create result item
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        // Add status icon
        const statusIcon = document.createElement('i');
        statusIcon.className = isCorrect ? 'fas fa-check-circle result-correct-icon' : 'fas fa-times-circle result-incorrect-icon';
        resultItem.appendChild(statusIcon);

        // Create question
        const question = document.createElement('div');
        question.className = 'result-question';
        question.textContent = `${index + 1}. ${q.question}`;
        resultItem.appendChild(question);

        // Create user's answer with appropriate styling
        const answer = document.createElement('div');
        answer.className = isCorrect ? 'result-answer correct' : 'result-answer incorrect';
        answer.innerHTML = `<strong>Your Answer:</strong> ${userAnswer || 'Not Answered'}`;
        resultItem.appendChild(answer);

        // Create correct answer with explanation if available
        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.className = 'result-correct';
        correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong> ${q.correctAnswer}`;
        resultItem.appendChild(correctAnswerDiv);
        
        // Add explanation if available
        if (q.explanation) {
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'result-explanation';
            explanationDiv.innerHTML = `<i class="fas fa-info-circle"></i> <strong>Explanation:</strong> ${q.explanation}`;
            resultItem.appendChild(explanationDiv);
        }
        
        detailedResults.appendChild(resultItem);
    });

    // Create and display score summary
    const scorePercentage = Math.round((score / activeQuestions.length) * 100);
    const resultElement = document.querySelector('.result-percentage');
    if (resultElement) {
        resultElement.textContent = `${scorePercentage}%`;
    }
    
    // Update score display
    if (scoreDisplay) {
        scoreDisplay.textContent = `${score} of ${activeQuestions.length}`;
    }
    
    // Calculate and update incorrect answers
    const incorrectAnswers = activeQuestions.length - score;
    const incorrectCountElement = document.getElementById('incorrect-count');
    if (incorrectCountElement) {
        incorrectCountElement.textContent = incorrectAnswers;
    }
    
    // Create performance feedback element
    const performanceFeedback = document.createElement('div');
    performanceFeedback.className = 'performance-feedback';
    
    // Set feedback message based on score percentage
    if (scorePercentage >= 90) {
        performanceFeedback.innerHTML = '<i class="fas fa-trophy"></i> Excellent! Outstanding performance!';
        performanceFeedback.style.color = 'var(--success-color)';
        performanceFeedback.style.backgroundColor = 'var(--success-light)';
    } else if (scorePercentage >= 70) {
        performanceFeedback.innerHTML = '<i class="fas fa-medal"></i> Very Good! Great progress.';
        performanceFeedback.style.color = 'var(--primary-color)';
        performanceFeedback.style.backgroundColor = 'var(--primary-color-light)';
    } else if (scorePercentage >= 50) {
        performanceFeedback.innerHTML = '<i class="fas fa-thumbs-up"></i> Good, you can improve further.';
        performanceFeedback.style.color = 'var(--info-color)';
        performanceFeedback.style.backgroundColor = 'var(--info-light)';
    } else {
        performanceFeedback.innerHTML = '<i class="fas fa-book"></i> You need more review.';
        performanceFeedback.style.color = 'var(--warning-color)';
        performanceFeedback.style.backgroundColor = 'var(--warning-light)';
    }
    
    // Append performance feedback to results section
    const resultsHeader = document.querySelector('.results-header');
    if (resultsHeader && !document.querySelector('.performance-feedback')) {
        resultsHeader.after(performanceFeedback);
    }
}

function restartQuiz() {
    startQuiz(topicDropdown.value); // Restart with the same topic
}

function backToTopics() {
    resultsSection.style.display = 'none';
    quizContainer.style.display = 'none';
    topicSelectionSection.style.display = 'block';
}

// Utility function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- Event Listeners ---
prevBtn.addEventListener('click', () => {
    currentQuestionIndex--;
    loadQuestion();
});

// Return to Home buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all return home buttons
    const returnHomeButtons = document.querySelectorAll('.return-home-btn, #return-home-from-results, #home-link');
    
    // Add click event listener to each button
    returnHomeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show intro section and hide others
            document.getElementById('intro-section').classList.remove('hidden');
            document.getElementById('quiz-section').classList.add('hidden');
            document.getElementById('results-section').classList.add('hidden');
            
            // Reset the quiz state if needed
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = [];
        });
    });
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

submitBtn.addEventListener('click', showResults);
restartBtn.addEventListener('click', restartQuiz);
backToTopicsBtn.addEventListener('click', backToTopics);

// Set up start quiz button with dropdown selection
startQuizBtn.addEventListener('click', () => {
    const selectedTopic = topicDropdown.value;
    startQuiz(selectedTopic);
});

// Setup dropdown with available topics
topicDropdown.addEventListener('change', function() {
    // Could add additional functionality here if needed when topic changes
});

// Initial state: show topic selection
document.addEventListener('DOMContentLoaded', () => {
    topicSelectionSection.style.display = 'block';
    quizContainer.style.display = 'none';
    resultsSection.style.display = 'none';
});