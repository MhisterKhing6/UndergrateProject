#!/bin/bash

# Give execute permision
# Run as sudo

# Exit on any error
set -e

# Update package list and upgrade all packages
echo "Updating package list and upgrading existing packages..."
sudo apt update && sudo apt upgrade -y

# Install prerequisites
echo "Installing prerequisites..."
sudo apt install -y curl wget gnupg software-properties-common

# Install Node.js (latest LTS version)
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Install Java (default JDK)
echo "Installing Java Development Kit..."
sudo apt install -y default-jdk

# Install MariaDB
echo "Installing MariaDB..."
sudo apt install -y mariadb-server

# Enable and start MariaDB service
echo "Enabling and starting MariaDB service..."
sudo systemctl enable mariadb
sudo systemctl start mariadb

# Secure MariaDB installation
echo "Securing MariaDB installation..."
sudo mysql -e "SET PASSWORD FOR 'root'@'localhost' = PASSWORD('kkkkkkkk');"
sudo mysql -e "DELETE FROM mysql.user WHERE User='';"
sudo mysql -e "DELETE FROM mysql.user WHERE User='root' AND Host!='localhost';"
sudo mysql -e "DROP DATABASE IF EXISTS test;"
sudo mysql -e "FLUSH PRIVILEGES;"

# Install GCC and G++
echo "Installing GCC and G++..."
sudo apt install -y gcc g++


# Install Ruby
echo "Installing Ruby..."
sudo apt install -y ruby-full

# Install PHP
echo "Installing PHP..."
sudo apt install -y php php-cli php-mysql

# Install Python3 and Pylint
echo "Installing Python3 and Pylint..."
sudo apt install -y python3 python3-pip
pip3 install pylint

# Install PHP_CodeSniffer
echo "Installing PHP_CodeSniffer..."
sudo apt install -y php-pear
sudo pear install PHP_CodeSniffer

# Install npm and 'standard' package globally
echo "Installing npm and 'standard' package..."
sudo npm install -g standard

# Install Checkstyle
echo "Installing Checkstyle..."
CHECKSTYLE_VERSION=8.50 # Use the desired version here
wget https://github.com/checkstyle/checkstyle/releases/download/checkstyle-${CHECKSTYLE_VERSION}/checkstyle-${CHECKSTYLE_VERSION}-all.jar -O /usr/local/bin/checkstyle.jar
sudo chmod +x /usr/local/bin/checkstyle.jar
echo 'alias checkstyle="java -jar /usr/local/bin/checkstyle.jar"' >> ~/.bashrc
source ~/.bashrc

# Install cpplint
echo "Installing cpplint..."
pip3 install cpplint

# Verify installations
echo "Verifying installations..."
node -v
java -version
mysql --version
gcc --version
g++ --version
ruby -v
php -v
python3 --version
pylint --version
phpcs --version
npm list -g standard
checkstyle -version
cpplint --version

echo "Installation and configuration complete!"
