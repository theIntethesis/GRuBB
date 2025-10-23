{
  description = "creates a mongodb user service file with a specified data path and provides the ability to run mongoose, mongosh, etc...";

  inputs.nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

  outputs = { self, nixpkgs}:
    let
        dataPath = "bins/nixos/mongodb-data";
        system = "x86_64-linux";
        pkgs = import nixpkgs {
            inherit system;
            config = { allowUnfree = true; };
        };
        mongodbService = ''
[Unit]
Description=Project Local MongoDB
After=network.target

[Service]
WorkingDirectory=/home/julia/Projects/GRuBB
ExecStart=${pkgs.mongodb}/bin/mongod --dbpath=${dataPath} --bind_ip 127.0.0.1
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=default.target
        '';
    in {
        devShells.${system}.default = pkgs.mkShell {
            buildInputs = with pkgs; [
                mongoose
                mongosh
                mongodb
            ];
            shellHook = ''
                echo "${mongodbService}" > ~/.config/systemd/user/mongodb.service
                systemctl --user daemon-reload

                echo "start the server with systemctl --user start mongodb"
            '';
        };

    };
}