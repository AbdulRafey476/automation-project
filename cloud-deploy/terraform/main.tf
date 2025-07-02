terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.0.0"
    }
  }
}

provider "aws" {
  region                   = "us-east-1"
  shared_credentials_files = ["C:/Users/sheik/.aws/credentials"]
  profile                  = "abdul"

}

# Security Groups
resource "aws_security_group" "ssh_sg" {
  name   = "ssh-sg"
  vpc_id = "vpc-01309b5431b48d98f"

  tags = {
    Name = "ssh-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh" {
  security_group_id = aws_security_group.ssh_sg.id
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_vpc_security_group_ingress_rule" "allow_http" {
  security_group_id = aws_security_group.ssh_sg.id
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_vpc_security_group_egress_rule" "allow_all" {
  security_group_id = aws_security_group.ssh_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_instance" "app_server" {
  ami                         = "ami-05ffe3c48a9991133"
  instance_type               = "t2.micro"
  key_name                    = "networking-key"
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.ssh_sg.id]

  tags = {
    Name = "web-server"
  }
}
output "public_ip" {
  description = "EC2 public IP"
  value       = aws_instance.app_server.public_ip
}