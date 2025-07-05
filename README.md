# 🌐 Cloud Docker Automation Project

This project automates the provisioning and configuration of a cloud server on AWS to deploy a Dockerized web application using **Terraform**, **Ansible**, and **CI/CD via GitHub Actions**.

---

## 📁 Project Structure

```
cloud-deploy/
├── ansible/               # Ansible playbook to install Docker and run container
├── app/                   # Docker app (sample application)
├── terraform/             # Terraform scripts to create EC2 and security group
├── report/                # PDF report and screenshots
├── .github/workflows/     # GitHub Actions CI/CD pipeline
└── README.md              # Project documentation
```

---

## 🚀 Tools Used

| Tool          | Purpose                                  |
|---------------|-------------------------------------------|
| AWS           | Cloud provider to host the EC2 instance   |
| Terraform     | Infrastructure provisioning               |
| Ansible       | Remote configuration & Docker deployment  |
| Docker        | Containerized web application             |
| GitHub Actions| CI/CD pipeline automation (optional)      |

---

## 🔧 Prerequisites

- [Terraform](https://www.terraform.io/downloads)
- [Ansible](https://docs.ansible.com)
- [AWS CLI](https://aws.amazon.com/cli/)
- Valid AWS credentials in `~/.aws/credentials`
- SSH key pair to connect to EC2 instance
- GitHub account (for CI/CD)

---

## ⚙️ How to Use

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AbdulRafey476/automation-project.git
cd cloud-deploy
```

---

### 2️⃣ Setup AWS Credentials

```bash
aws configure
```

Ensure your AWS profile is referenced in `terraform/main.tf`.

---

### 3️⃣ Provision Infrastructure with Terraform

```bash
cd terraform
terraform init
terraform apply
```

Terraform will:
- Launch an EC2 instance in the default VPC
- Open ports **22 (SSH)** and **80 (HTTP)**
- Output the **EC2 public IP address**

---

### 4️⃣ Configure EC2 and Deploy App with Ansible

Edit your `inventory.ini` file:

```ini
[web]
<EC2_PUBLIC_IP> ansible_user=ec2-user ansible_ssh_private_key_file=~/.ssh/ssh-networking-key.pem
```

Run the playbook:

```bash
cd ../ansible
ansible-playbook docker-installation.yml -i inventory.ini
```

Ansible will:
- SSH into the EC2 instance
- Install Docker
- Pull and run a Docker image (e.g., `abdulrafey/simple-web:latest`)

---

### 5️⃣ Verify Deployment

Open your browser and visit:

```
http://<EC2_PUBLIC_IP>
```

You should see the deployed web app.

---

## 🔁 CI/CD with GitHub Actions (Optional)

The GitHub Actions pipeline in `.github/workflows/docker-build.yml` can:
- Validate Terraform formatting
- Run Ansible lint checks
- Trigger on push or pull request

---

## 🧹 Cleanup Resources

To avoid AWS charges, destroy your resources when done:

```bash
cd terraform
terraform destroy
```

---

## 🖼️ Diagram: Automation Overview

```
+------------------------+
|    Local Machine       |
| (Terraform + Ansible)  |
+------------------------+
           |
           |  SSH + Provisioning
           v
+------------------------+
|   AWS EC2 Instance     |
| - Docker Installed     |
| - Web App Running      |
+------------------------+
           |
           v
   http://<EC2_PUBLIC_IP>
```

---

## 📸 Screenshots

Included in the `report/screenshots/` folder:
- Terraform `apply` output
- Ansible playbook execution
- Docker container running (`docker ps`)
- Web app opened in browser
- CI/CD pipeline result (GitHub Actions)

---

## 📄 Report

The full technical report is available in:

```
report/automation-report.pdf
```

Covers:
- Tools used and why
- Infrastructure and configuration code
- CI/CD pipeline integration
- Testing and outcomes
- Challenges and learning reflection

---

## 🔗 Author & Contact

- **Name:** Abdul Rafey  & Shaikh Saad
- **Module:** B9IS121 – Network Systems and Administration  
- **Instructor:** Kingsley Ibomo  
- **GitHub:** [@AbdulRafey476](https://github.com/AbdulRafey476)

---

## ✅ License

This project is for educational purposes under the **MIT License**.
