{
  description = "creates a mongodb user service file with a specified data path and provides the ability to run mongoose, mongosh, etc...";

  inputs.nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

  outputs = { self, nixpkgs}:
    let
        dataPath = "./mongo/database";
        workingDirectory = "/home/julia/Projects/GRuBB";
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
            WorkingDirectory=${workingDirectory}
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
                mongodb-compass
            ];
            shellHook = ''
                alias StartMongo='systemctl --user start mongodb'
                alias StopMongo='systemctl --user stop mongodb'
                echo "${mongodbService}" > ~/.config/systemd/user/mongodb.service
                systemctl --user daemon-reload

                echo "StartMongo, StopMongo"
            '';
        };

    };
}