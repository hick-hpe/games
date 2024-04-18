import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

public class Blackjack {

    static Scanner entrada;
    static String[] baralho;
    static boolean jogoRodando = true;

    // abrir entrada do Scanner
    public static void abrir_entrada() {
        entrada = new Scanner(System.in);
    }

    // fechar entrada do Scanner
    public static void fechar_entrada() {
        entrada.close();
    }

    // converter valor da carta:
    // se o numero precisar representar uma letra,
    public static String converter_valor_da_carta(int valor) {
        if (valor == 1) {
            return "A";
        } else if (valor == 11) {
            return "J";
        } else if (valor == 12) {
            return "Q";
        } else if (valor == 13) {
            return "K";
        }
        return valor + "";
    }

    // preencher baralho
    public static void preencher_baralho() {
        String[] naipes = { "Paus", "Copas", "Espadas", "Ouros" };
        int contador = 0;
        
        for (String naipe : naipes) {
            for (int valor = 1; valor <= 13; valor++) {
                String valorCarta = converter_valor_da_carta(valor);
                String carta = valorCarta + " de " + naipe;
                baralho[contador++] = carta;
            }
        }
    }
    

    // exibir cartas
    public static void exibir_mao_jogador(ArrayList<String> cartas, boolean jogador) {
        if (jogador) {
            System.out.println("| -------------------------------------- |");
            System.out.println("|              MAO DO JOGADOR            |");
            System.out.println("| -------------------------------------- |");
        } else {
            System.out.println("| -------------------------------------- |");
            System.out.println("|              MAO DO BOT                |");
            System.out.println("| -------------------------------------- |");
        }
        System.out.println(String.join("\n", cartas));
        System.out.println();
    }

    // comprar cartas
    public static String comprar_carta(int proximaCompradeCarta) {
        String carta = baralho[proximaCompradeCarta];
        baralho[proximaCompradeCarta] = null;
        return carta;
    }

    // embaralhar cartas
    public static void embaralhar_cartas() {
        String[] baralho_embaralhado = new String[baralho.length];
        ArrayList<String> cartas = new ArrayList<>();
        ArrayList<Integer> indices_cartas = new ArrayList<>();

        // divide os incides e as cartas em duas listas
        for (int i = 0; i < baralho.length; i++) {
            cartas.add(baralho[i]);
            indices_cartas.add(i);
        }

        for (int i = 0; i < baralho_embaralhado.length; i++) {
            int random = new Random().nextInt(cartas.size());
            baralho_embaralhado[i] = cartas.get(random);
            cartas.remove(random);
            indices_cartas.remove(random);
        }
    }

    // exibir menu de boas vindas
    public static void menu() {
        System.out.println("| -------------------------------------- |");
        System.out.println("|                                        |");
        System.out.println("|           BEM VINDO BLACKJACK!         |");
        System.out.println("|                                        |");
        System.out.println("| -------------------------------------- |");
        System.out.println();
    }

    public static void main(String[] args) {
        // variaveis
        baralho = new String[52];
        ArrayList<String> minhasCartas = new ArrayList<String>();
        ArrayList<String> cartasBot = new ArrayList<String>();
        boolean jogador = true;
        int proximaCompradeCarta = 0;

        // preencher baralho
        preencher_baralho();

        // embaralhar
        embaralhar_cartas();

        // exibir menu de boas vindas
        menu();

        // comprar cartas para o bot
        minhasCartas.add(comprar_carta(proximaCompradeCarta));
        proximaCompradeCarta++;
        minhasCartas.add(comprar_carta(proximaCompradeCarta));
        proximaCompradeCarta++;

        // comprar cartas para o bot
        cartasBot.add(comprar_carta(proximaCompradeCarta));
        proximaCompradeCarta++;
        cartasBot.add(comprar_carta(proximaCompradeCarta));
        proximaCompradeCarta++;

        // exibir cartas do jogador
        // exibir_mao_jogador(minhasCartas, true);
        // exibir_mao_jogador(minhasCartas, false);

        // abrir entrada
        // abrir_entrada();

        // loop do jogo
        // while (jogoRodando) {
        //     // code...
        // }

        // fechar entrada
        // fechar_entrada();

    }
}
